import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistoricalDatesStore } from '@/entities/HistoricalDates/lib/StoreContext';
import { Button } from '@/components/Button';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import s from './ThemeControls.module.scss';

export const ThemeControls: React.FC = observer(() => {
	const store = useHistoricalDatesStore();

  const { 
    data, 
    activeId, 
    activeIndex, 
    setActiveId, 
    nextPeriod, 
    prevPeriod,
    isAnimating
  } = store;

  if (data.length === 0) return null;

  const total = data.length;
  const currentNum = String(activeIndex + 1).padStart(2, '0');
  const totalNum = String(total).padStart(2, '0');

  // Создаем класс блокировки
  const buttonClass = isAnimating ? s.locked : '';

  return (
    <div className={s.container}>
      <div className={s.infoBlock}>
        <div className={s.counter}>
          {currentNum}/{totalNum}
        </div>

        <div className={s.buttons}>
          <Button
            variant="primary"
            size="m"
            iconOnly
            Icon={SlArrowLeft}
            onClick={prevPeriod}
            disabled={activeIndex === 0}
            className={`${s.navBtn} ${buttonClass}`} // Применяем блокировку
          />
          <Button
            variant="primary"
            size="m"
            iconOnly
            Icon={SlArrowRight}
            onClick={nextPeriod}
            disabled={activeIndex === total - 1}
            className={`${s.navBtn} ${buttonClass}`} // Применяем блокировку
          />
        </div>
      </div>

      <div className={s.pagination}>
        {data.map((item) => (
          <button
            key={item.id}
            // Блокируем и точки пагинации тоже
            className={`${s.dot} ${item.id === activeId ? s.active : ''} ${buttonClass}`}
            onClick={() => !isAnimating && setActiveId(item.id)}
            aria-label={`Go to period ${item.id}`}
          />
        ))}
      </div>
    </div>
  );
});
