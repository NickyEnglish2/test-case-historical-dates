import React from 'react';
import s from './HistoricalDates.module.scss';

export const HistoricalDates: React.FC = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.gradientLine} />
      
      <div className={s.titleWrapper}>
        <h1 className={s.title}>
          Исторические <br /> даты
        </h1>
      </div>

      {/* Здесь в будущем будет контент: слайдер и круговая навигация */}
    </section>
  );
};
