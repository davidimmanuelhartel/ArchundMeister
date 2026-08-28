import React from 'react';
import manifest from './image-manifest.json';

type ImageInfo = { width: number; height: number; webp: string };

const IMAGES = manifest as Record<string, ImageInfo>;

/** Intrinsic size + WebP sibling for a local image, or null for remote/unknown sources. */
export function imageInfo(src: string | null | undefined): ImageInfo | null {
  if (!src) return null;
  return IMAGES[src] ?? null;
}

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority; everything else lazily. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders a WebP source with a JPEG fallback, and carries intrinsic width/height
 * so the browser can reserve space before the image loads (avoids layout shift).
 * Falls back to a plain <img> for remote URLs that are not in the manifest.
 */
export const Picture: React.FC<PictureProps> = ({ src, alt, className, priority, sizes }) => {
  const info = imageInfo(src);

  const imgProps = {
    src,
    alt,
    className,
    sizes,
    width: info?.width,
    height: info?.height,
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: 'async' as const,
    ...(priority ? { fetchPriority: 'high' as const } : {}),
  };

  if (!info) return <img {...imgProps} />;

  return (
    <picture>
      <source srcSet={info.webp} type="image/webp" />
      <img {...imgProps} />
    </picture>
  );
};
