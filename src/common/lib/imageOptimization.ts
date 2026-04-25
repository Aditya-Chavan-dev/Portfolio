/**
 * ─── Image Optimization Utility ──────────────────────────────────────────
 * Shrinks uploaded profile images to a fast-loading thumbnail for Firestore
 * storage (Base64). Aiming for < 15KB output.
 */

export async function compressProfileImage(file: File, maxWidth = 160, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Force square crop or just containment? 
        // For testimonials, square looks best.
        const size = Math.min(width, height);
        const offsetX = (width - size) / 2;
        const offsetY = (height - size) / 2;

        canvas.width = maxWidth;
        canvas.height = maxWidth;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw cropped square
        ctx.drawImage(
          img, 
          offsetX, offsetY, size, size, 
          0, 0, maxWidth, maxWidth
        );

        // Convert to optimized JPEG Base64
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      
      img.onerror = (err) => reject(err);
    };
    
    reader.onerror = (err) => reject(err);
  });
}
