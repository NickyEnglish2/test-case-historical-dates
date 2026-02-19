import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { gsap } from 'gsap';
import { historicalDatesStore } from '@/entities/HistoricalDates/model/store';
import s from './YearsRange.module.scss';

export const YearsRange: React.FC = observer(() => {
  const { activeBlock } = historicalDatesStore;
  
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);

  const prevFirst = useRef(activeBlock?.firstYear || 0);
  const prevSecond = useRef(activeBlock?.secondYear || 0);

  useEffect(() => {
    if (!activeBlock || !firstRef.current || !secondRef.current) return;

    const firstObj = { val: prevFirst.current };
    gsap.to(firstObj, {
      val: activeBlock.firstYear,
      duration: 1,
      roundProps: 'val',
      ease: 'power3.out',
      onUpdate: () => {
        if (firstRef.current) firstRef.current.innerText = String(Math.round(firstObj.val));
      },
    });

    const secondObj = { val: prevSecond.current };
    gsap.to(secondObj, {
      val: activeBlock.secondYear,
      duration: 1,
      roundProps: 'val',
      ease: 'power3.out',
      onUpdate: () => {
        if (secondRef.current) secondRef.current.innerText = String(Math.round(secondObj.val));
      },
    });

    prevFirst.current = activeBlock.firstYear;
    prevSecond.current = activeBlock.secondYear;

  }, [activeBlock]);

  if (!activeBlock) return null;

  return (
    <div className={s.container}>
      <span ref={firstRef} className={s.firstYear}>
        {activeBlock.firstYear}
      </span>
      <span ref={secondRef} className={s.secondYear}>
        {activeBlock.secondYear}
      </span>
    </div>
  );
});
