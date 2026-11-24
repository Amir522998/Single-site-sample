import { useState } from 'react';
import { Smartphone } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ProductImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-zinc-100 via-zinc-200/70 to-zinc-100 flex flex-col items-center justify-center p-4 text-zinc-400">
        <Smartphone className="w-8 h-8 mb-2 stroke-[1.5]" />
        {fallbackLabel && (
          <span className="text-xs font-medium text-zinc-500 text-center line-clamp-1">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
