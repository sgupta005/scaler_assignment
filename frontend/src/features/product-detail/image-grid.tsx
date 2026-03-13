import { useState } from 'react';
import type { ProductImage } from '../../types/products';

interface ImageGridProps {
  images: ProductImage[];
  name: string;
}

export function ImageGrid({ images, name }: ImageGridProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-zinc-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        No images
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-square bg-zinc-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-6">
        <img
          src={images[activeIdx]?.url || '/image.png'}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all bg-zinc-50 flex items-center justify-center p-2 ${
                i === activeIdx
                  ? 'border-blue-500 shadow-sm'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img.url || '/image.png'}
                alt={`${name} ${i + 1}`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
