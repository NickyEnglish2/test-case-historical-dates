import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { observer } from 'mobx-react-lite';
import { gsap } from 'gsap';

import { historicalDatesStore } from '@/entities/HistoricalDates/model/store';
import { Button } from '@/components/Button';
import { SliderCard } from './ui/SliderCard';

import 'swiper/css';
import 'swiper/css/navigation';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import s from './EventsSlider.module.scss';

export const EventsSlider: React.FC = observer(() => {
  const { activeBlock } = historicalDatesStore;
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedData, setDisplayedData] = useState(activeBlock);
  const isFirstRender = useRef(true);

  if (!displayedData && activeBlock) {
    setDisplayedData(activeBlock);
  }

  useEffect(() => {
    if (!containerRef.current || !activeBlock) return;

    const tl = gsap.timeline();

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(containerRef.current, { opacity: 0, y: 15 });
      
      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out'
      });
    } else {
      tl.to(containerRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setDisplayedData(activeBlock);
        }
      });

      tl.to({}, { duration: 0.5 }); 

      tl.set(containerRef.current, { y: 20, opacity: 0 });

      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    return () => { tl.kill(); };
  }, [activeBlock]);

  if (!activeBlock || !displayedData) return null;

  return (
    <div className={s.container} ref={containerRef} style={{ opacity: 0 }}>
      <div className={s.navigationWrapper}>
        <Button
          variant="secondary"
          size="s"
          iconOnly
          Icon={SlArrowLeft}
          className={`${s.navBtn} ${s.prevBtn}`}
          id="prev-event"
        />
        <Button
          variant="secondary"
          size="s"
          iconOnly
          Icon={SlArrowRight}
          className={`${s.navBtn} ${s.nextBtn}`}
          id="next-event"
        />
      </div>

      <Swiper
        key={displayedData.id}
        modules={[Navigation]}
        className={s.swiperWrapper}
        spaceBetween={25}
        slidesPerView="auto"
        watchSlidesProgress={true}
        grabCursor={true}
        navigation={{
          prevEl: '#prev-event',
          nextEl: '#next-event',
        }}
        breakpoints={{
          1440: {
            spaceBetween: 80,
          }
        }}
      >
        {displayedData.events.map((event) => (
          <SwiperSlide key={event.id} className={s.slide}>
            <SliderCard 
              year={event.year} 
              description={event.description} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
