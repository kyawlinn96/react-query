import cn from 'classnames';

const SkeletonLoader = ({
  className = '',
  delayIndex = 0,
  animationDelay = 150,
}) => {
  return (
    <div
      className={cn('animate-skeleton', className)}
      //   style={{
      //     animationFillMode: 'backwards',
      //     animationDelay: `${delayIndex * animationDelay}ms`,
      //   }}
    />
  );
};

export default SkeletonLoader;
