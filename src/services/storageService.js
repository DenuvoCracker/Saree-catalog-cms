import { supabase } from "../lib/supabaseClient.js";

const BUCKET = "product-images";

/**
 * Uploads one image file to Supabase Storage and returns its public URL.
 * Filenames are namespaced with a timestamp + random suffix to avoid collisions.
 */
export async function uploadProductImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

// Upload multiple images in parallel, used by the admin product form
export async function uploadProductImages(files) {
  const uploads = Array.from(files).map((file) => uploadProductImage(file));
  return Promise.all(uploads);
}

// Extracts the storage path from a public URL so we can delete the right object
function extractPathFromPublicUrl(url) {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function deleteProductImages(urls) {
  const paths = urls.map(extractPathFromPublicUrl).filter(Boolean);
  if (!paths.length) return;
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) throw error;
}
