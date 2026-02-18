import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import s from './App.module.scss';

export const App: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, []);

  return (
    <div className={s.container}>
      <h1 ref={titleRef} className={s.title}>Тестовое задание</h1>
      
      <div className={s.date}>2024</div>

      <Swiper spaceBetween={30} slidesPerView={1}>
        <SwiperSlide>Слайд 1</SwiperSlide>
        <SwiperSlide>Слайд 2</SwiperSlide>
      </Swiper>
    </div>
  );
};
