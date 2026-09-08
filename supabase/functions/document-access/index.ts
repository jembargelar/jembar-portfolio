import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const BUCKET = "portfolio-documents";
const SIGNED_URL_SECONDS = 120;

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function getSecretKey() {
  const serializedKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (!serializedKeys) throw new Error("Server signing key is unavailable.");
  const keys = JSON.parse(serializedKeys);
  if (!keys.default) throw new Error("Server signing key is unavailable.");
  return keys.default as string;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  try {
    const { documentId } = await request.json();
    if (typeof documentId !== "string" || !/^[0-9a-f-]{36}$/i.test(documentId)) {
      return response({ error: "Invalid document request" }, 400);
    }

    const url = Deno.env.get("SUPABASE_URL");
    const publishableKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!url || !publishableKey) throw new Error("Server configuration is unavailable.");

    // This client deliberately uses the caller's credentials. Table RLS permits
    // public active rows, or all rows only for authenticated administrators.
    const callerClient = createClient(url, publishableKey, {
      global: { headers: { Authorization: request.headers.get("Authorization") ?? "" } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: document, error: documentError } = await callerClient
      .from("portfolio_documents")
      .select("id,file_path,file_name,mime_type,title_id,title_en,watermark,is_public,is_active,deletion_status")
      .eq("id", documentId)
      .eq("deletion_status", "active")
      .maybeSingle();

    if (documentError || !document) return response({ error: "Document unavailable" }, 404);

    const adminClient = createClient(url, getSecretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: signed, error: signingError } = await adminClient.storage
      .from(BUCKET)
      .createSignedUrl(document.file_path, SIGNED_URL_SECONDS);

    if (signingError || !signed?.signedUrl) throw new Error("Unable to prepare document.");

    return response({
      signedUrl: signed.signedUrl,
      expiresAt: new Date(Date.now() + SIGNED_URL_SECONDS * 1000).toISOString(),
      mimeType: document.mime_type,
    });
  } catch (error) {
    console.error("document-access failed", error instanceof Error ? error.message : "unknown error");
    return response({ error: "Document unavailable" }, 500);
  }
});
