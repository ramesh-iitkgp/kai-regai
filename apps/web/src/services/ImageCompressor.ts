/**
 * Resizes and compresses palm photos client-side to ensure fast uploads
 * and prevent unnecessary network overhead while maintaining high contrast for palm line analysis.
 */
export async function compressPalmImage(
  imageSource: HTMLImageElement | File | Blob,
  maxDimension: number = 1200,
  quality: number = 0.86
): Promise<{ blob: Blob; dataUrl: string }> {
  let img: HTMLImageElement;

  if (imageSource instanceof HTMLImageElement) {
    img = imageSource;
  } else {
    img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = (err) => reject(err);
      el.src = URL.createObjectURL(imageSource);
    });
  }

  const canvas = document.createElement('canvas');
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (width > height) {
    if (width > maxDimension) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    }
  } else {
    if (height > maxDimension) {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not obtain canvas context');

  ctx.drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL('image/jpeg', quality);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate image blob'));
      },
      'image/jpeg',
      quality
    );
  });

  return { blob, dataUrl };
}
