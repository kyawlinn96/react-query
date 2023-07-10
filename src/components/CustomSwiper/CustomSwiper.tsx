import { Navigation, Pagination, EffectFade, Autoplay, Grid } from 'swiper';

import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/grid';

const CustomSwiper = (props: any) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade, Autoplay, Grid]}
      {...props}
      effect={props.effect}
      {...props}
    >
      {props.children}
    </Swiper>
  );
};

export default CustomSwiper;
