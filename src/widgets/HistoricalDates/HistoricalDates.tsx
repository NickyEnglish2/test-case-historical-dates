import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { historicalDatesStore } from '@/entities/HistoricalDates/model/store';
import { ThemeSelector } from '@/features/ThemeSelector/ThemeSelector';
import { YearsRange } from '@/features/YearsRange/YearsRange';
import { EventsSlider } from '@/features/EventsSlider/EventsSlider';
import { ThemeControls } from '@/features/ThemeControls/ThemeControls';
import s from './HistoricalDates.module.scss';

export const HistoricalDates: React.FC = observer(() => {
  const { fetchHistoricalDates } = historicalDatesStore;

  useEffect(() => {
    fetchHistoricalDates();
  }, [fetchHistoricalDates]);

  return (
    <div className={s.pageContainer}>
      <section className={s.wrapper}>
        <div className={s.gradientLine} />      
        <div className={s.titleWrapper}>
          <h1 className={s.title}>
            Исторические <br /> даты
          </h1>
        </div>

        <ThemeControls />

        <ThemeSelector />

        <YearsRange />

        <div className={s.horizontalLine} />

        <div className={s.footer}>
          <EventsSlider />
        </div>
      </section>
    </div>
  );
});
