import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ImageLoaderProps {
  alt: string;
  src: string;
  className: string;
}
const ImageLoader = ({ alt, src, className }: ImageLoaderProps) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect='blur'
      threshold={50}
      className={className}
    />
  );
};
export default ImageLoader;
