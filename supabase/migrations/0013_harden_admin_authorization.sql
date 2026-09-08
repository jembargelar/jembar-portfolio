begin;

-- Keep the authorization helper out of the exposed public schema. RLS policies
-- can call this function, while PostgREST cannot expose it as an RPC endpoint.
create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and is_active = true
  );
$$;

revoke all on schema private from public;
grant usage on schema private to authenticated;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

-- Preserve every existing policy predicate while replacing only the helper
-- reference. This covers public CMS tables and storage.objects.
do $$
declare
  policy_row record;
  statement text;
begin
  for policy_row in
    select
      n.nspname as schema_name,
      c.relname as table_name,
      p.polname as policy_name,
      pg_get_expr(p.polqual, p.polrelid) as using_expression,
      pg_get_expr(p.polwithcheck, p.polrelid) as check_expression
    from pg_policy p
    join pg_class c on c.oid = p.polrelid
    join pg_namespace n on n.oid = c.relnamespace
    where replace(coalesce(pg_get_expr(p.polqual, p.polrelid), ''), 'public.is_admin()', 'is_admin()') like '%is_admin()%'
       or replace(coalesce(pg_get_expr(p.polwithcheck, p.polrelid), ''), 'public.is_admin()', 'is_admin()') like '%is_admin()%'
  loop
    statement := format(
      'alter policy %I on %I.%I',
      policy_row.policy_name,
      policy_row.schema_name,
      policy_row.table_name
    );

    if policy_row.using_expression is not null then
      statement := statement || format(
        ' using (%s)',
        regexp_replace(replace(policy_row.using_expression, 'public.is_admin()', 'private.is_admin()'), '(^|[^.[:alnum:]_])is_admin\(\)', '\1private.is_admin()', 'g')
      );
    end if;

    if policy_row.check_expression is not null then
      statement := statement || format(
        ' with check (%s)',
        regexp_replace(replace(policy_row.check_expression, 'public.is_admin()', 'private.is_admin()'), '(^|[^.[:alnum:]_])is_admin\(\)', '\1private.is_admin()', 'g')
      );
    end if;

    execute statement;
  end loop;
end;
$$;

-- The legacy public RPC is no longer needed by the application and must not
-- remain callable by anonymous or authenticated users.
revoke execute on function public.is_admin() from public, anon, authenticated;

commit;
