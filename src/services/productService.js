import { supabase } from "../lib/supabaseClient.js";
import { deleteProductImages } from "./storageService.js";

const TABLE = "products";

/**
 * Fetch products with optional search / category filter / sort.
 * Kept as one flexible function so both the public catalog and admin list can reuse it.
 */
export async function getProducts({
  search = "",
  category = "",
  sort = "newest",
  onlyFeatured = false,
} = {}) {
  let query = supabase.from(TABLE).select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  if (category) {
    query = query.eq("category", category);
  }
  if (onlyFeatured) {
    query = query.eq("featured", true);
  }

  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function getRelatedProducts(category, excludeId, limit = 4) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function createProduct(payload) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, payload) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Deletes the DB row AND its Storage images, so nothing orphaned is left in the bucket
export async function deleteProduct(id) {
  const product = await getProductById(id);
  if (product?.image_urls?.length) {
    await deleteProductImages(product.image_urls);
  }
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function getDashboardStats() {
  const { data, error } = await supabase.from(TABLE).select("stock_status, category");
  if (error) throw error;

  const totalSarees = data.length;
  const inStock = data.filter((p) => p.stock_status === "in_stock").length;
  const soldOut = data.filter((p) => p.stock_status === "sold_out").length;

  const categoryCounts = data.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return {
    totalSarees,
    inStock,
    soldOut,
    categories: Object.keys(categoryCounts).length,
    categoryCounts,
  };
}
