import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { gsap } from 'gsap';
import { historicalDatesStore } from '@/entities/HistoricalDates/model/store';
import s from './ThemeSelector.module.scss';

export const ThemeSelector: React.FC = observer(() => {
  const { data, activeId, setActiveId, isLoading } = historicalDatesStore;
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalPoints = data.length;
  const radius = 265;

  useEffect(() => {
    if (totalPoints === 0 || !circleRef.current) return;

    const activeIndex = data.findIndex(b => b.id === activeId);
    if (activeIndex === -1) return;

    const rotationAngle = -(activeIndex / totalPoints) * 360;

    const tl = gsap.timeline();

    tl.to(titleRefs.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    tl.to(circleRef.current, {
      rotation: rotationAngle,
      duration: 1,
      ease: 'power3.inOut',
    }, "-=0.1");

    tl.to(pointsRef.current, {
      rotation: -rotationAngle,
      duration: 1,
      ease: 'power3.inOut',
    }, "<");

    tl.to(titleRefs.current[activeIndex], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.in'
    });

  }, [activeId, data, totalPoints]);

  const getPointCoords = (index: number) => {
    const safeTotal = totalPoints || 1;
    const angle = (index / safeTotal) * 2 * Math.PI - Math.PI / 3;
    return {
      x: radius + radius * Math.cos(angle),
      y: radius + radius * Math.sin(angle),
    };
  };

  if (totalPoints === 0 || isLoading) return null;

  return (
    <div className={s.container}>
      <div className={s.circle}>
        <div className={s.pointWrapper} ref={circleRef}>
          {data.map((block, index) => {
            const coords = getPointCoords(index);
            const isActive = block.id === activeId;

            return (
              <div
                key={block.id}
                ref={(el) => { pointsRef.current[index] = el; }}
                className={s.pointContainer}
                style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
                onClick={() => setActiveId(block.id)}
              >
                <div className={`${s.point} ${isActive ? s.active : ''}`}>
                  <span>{index + 1}</span>
                </div>
                
                <div 
                  ref={(el) => { titleRefs.current[index] = el; }}
                  className={s.title}
                >
                  {block.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
