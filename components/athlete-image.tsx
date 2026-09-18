import type { ComponentProps } from 'react';
import { colorImageSource } from '@/lib/athlete-images';

type AthleteImageProps = Omit<ComponentProps<'img'>, 'src' | 'alt'> & {
  src: string;
  alt: string;
};

/** A single selective-color master avoids a double silhouette during the reveal.
 * The backdrop is monochrome inside the asset; CSS only restores subject color.
 * No pointer handlers, second downloads on hover, canvas or layout changes.
 */
export function AthleteImage({
  src,
  alt,
  className,
  ...props
}: AthleteImageProps) {
  return (
    <img
      {...props}
      src={colorImageSource(src)}
      alt={alt}
      className={['athlete-image', className].filter(Boolean).join(' ')}
      data-athlete-color="selective"
    />
  );
}
