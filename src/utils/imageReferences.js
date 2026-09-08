import { supabase } from "../api/supabaseClient";

export const IMAGE_BUCKET = "project-images";

const PUBLIC_STORAGE_MARKER =
  `/storage/v1/object/public/${IMAGE_BUCKET}/`;

const IMAGE_REFERENCE_SOURCES = [
  {
    table: "hero_content",
    label: "Hero",
    column: "profile_image_url",
  },
  {
    table: "about_content",
    label: "About",
    column: "image_url",
  },
  {
    table: "support_content",
    label: "Support My Work",
    column: "qris_image_url",
  },
  {
    table: "projects",
    label: "Project",
    column: "image_url",
  },
  {
    table: "gallery_items",
    label: "Project Gallery",
    column: "image_url",
  },
];

export function getImagePublicUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(path);

  return data?.publicUrl || "";
}

export function normalizeImagePath(value) {
  if (!value) return "";

  const text = String(value).trim();

  if (!text) return "";

  if (
    text.startsWith("/") &&
    !text.startsWith(PUBLIC_STORAGE_MARKER)
  ) {
    return "";
  }

  if (!text.includes(PUBLIC_STORAGE_MARKER)) {
    if (
      text.startsWith("http://") ||
      text.startsWith("https://")
    ) {
      return "";
    }

    return text.replace(/^\/+/, "");
  }

  const path = text
    .slice(
      text.indexOf(PUBLIC_STORAGE_MARKER) +
        PUBLIC_STORAGE_MARKER.length
    )
    .split("?")[0]
    .split("#")[0];

  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

export function getStoragePathFromPublicUrl(value) {
  const normalized = normalizeImagePath(value);

  if (!normalized) return null;

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {
    return null;
  }

  return normalized;
}

export async function findImageReferences(imagePath) {
  const targetPath = normalizeImagePath(imagePath);

  if (!targetPath) return [];

  const results = await Promise.all(
    IMAGE_REFERENCE_SOURCES.map(
      async ({ table, label, column }) => {
        const { data, error } = await supabase
          .from(table)
          .select(`id,${column}`);

        if (error) {
          throw new Error(`${table}: ${error.message}`);
        }

        return {
          table,
          label,
          column,
          data: data || [],
        };
      }
    )
  );

  const references = [];

  for (const { label, column, data } of results) {
    for (const row of data) {
      if (normalizeImagePath(row[column]) === targetPath) {
        references.push({
          label,
          id: row.id,
        });
      }
    }
  }

  return references;
}

export async function assertImageNotReferenced(imagePath) {
  const references = await findImageReferences(imagePath);

  if (!references.length) {
    return references;
  }

  const details = references
    .map(
      (reference) =>
        `• ${reference.label} (${reference.id})`
    )
    .join("\n");

  throw new Error(
    `Gambar masih digunakan oleh:\n${details}\n\nGanti atau hapus referensinya terlebih dahulu.`
  );
}

export async function removeImageIfUnreferenced(imagePath) {
  const path = normalizeImagePath(imagePath);

  if (!path) {
    return {
      removed: false,
      path: null,
      references: [],
    };
  }

  const references = await findImageReferences(path);

  if (references.length > 0) {
    return {
      removed: false,
      path,
      references,
    };
  }

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .remove([path]);

  if (error) {
    throw error;
  }

  return {
    removed: true,
    path,
    references: [],
  };
}
