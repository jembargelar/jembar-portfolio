import { supabase } from "./supabaseClient";

export async function getPublicPortfolioDocuments() {
  const { data, error } = await supabase
    .from("portfolio_documents")
    .select("id,title_id,title_en,description_id,description_en,file_name,mime_type,category,watermark,sort_order")
    .eq("is_public", true)
    .eq("is_active", true)
    .eq("deletion_status", "active")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return { data: data || [], error };
}
