import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Container = styled.div`
  padding: 40px;
  background: #f0f0f0;
  h1 { color: #333; }
`;

export const App = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.to(titleRef.current, { x: 100, duration: 1 });
  }, []);

  return (
    <Container>
      <h1 ref={titleRef}>Hello World</h1>
      <Swiper>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
    </Container>
  );
};
