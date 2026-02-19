import React from 'react';
import s from '@/features/EventsSlider/EventsSlider.module.scss';

interface SliderCardProps {
  year: number;
  description: string;
}

export const SliderCard: React.FC<SliderCardProps> = ({ year, description }) => {
  return (
    <div className={s.card}>
      <div className={s.cardYear}>{year}</div>
      <p className={s.cardDescription}>{description}</p>
    </div>
  );
};
