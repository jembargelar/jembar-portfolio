const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const TARGET_QUALITY = 0.8;
const SKIP_OPTIMIZATION_BYTES = 500 * 1024;

function getOutputName(fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  return `${baseName}.webp`;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal membaca gambar."));
    };

    image.src = url;
  });
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Browser gagal membuat gambar WebP."));
          return;
        }

        resolve(blob);
      },
      "image/webp",
      quality
    );
  });
}

export async function optimizeImage(file) {
  if (!file) {
    throw new Error("File gambar tidak ditemukan.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("File yang dipilih bukan gambar.");
  }

  const isSmallWebp =
    file.type === "image/webp" &&
    file.size <= SKIP_OPTIMIZATION_BYTES;

  if (isSmallWebp) {
    return file;
  }

  const image = await loadImage(file);

  let width = image.naturalWidth || image.width;
  let height = image.naturalHeight || image.height;

  const scale = Math.min(
    1,
    MAX_WIDTH / width,
    MAX_HEIGHT / height
  );

  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Browser tidak mendukung image processing.");
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, TARGET_QUALITY);

  const optimizedName = getOutputName(file.name);

  return new File([blob], optimizedName, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}

export function formatImageSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
