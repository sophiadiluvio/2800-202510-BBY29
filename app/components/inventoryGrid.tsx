'use client';

import { useRef, useEffect, useState } from 'react';
import InventoryBar from './inventoryBar';
import { SHELTER_CATEGORIES } from '../types/shelterCategories';

type InventoryGridProps = {
  shelter: {
    inv: Record<string, number>;
    max: Record<string, number>;
  };
};

type InventoryItem = {
  label: string;
  value: number;
  max: number;
};

export default function InventoryGrid(props: InventoryGridProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allItems: InventoryItem[] = [];

  for (let i = 0; i < SHELTER_CATEGORIES.length; i++) {
    const label = SHELTER_CATEGORIES[i];
    const value = props.shelter.inv?.[label];
    const max = props.shelter.max?.[label];

    if (value != null && max != null && max !== 0) {
      allItems.push({ label: label, value: value, max: max });
    }
  }

  const pageSize = 4;
  const totalPages = Math.ceil(allItems.length / pageSize);
  const groupHeight = 500;

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.deltaY > 30) {
        setPageIndex(function (prev) {
          if (prev < totalPages - 1) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      } else {
        if (e.deltaY < -30) {
          setPageIndex(function (prev) {
            if (prev > 0) {
              return prev - 1;
            } else {
              return prev;
            }
          });
        }
      }
    }

    const container = containerRef.current;
    if (container != null) {
      container.addEventListener('wheel', handleWheel);
    }

    return function () {
      if (container != null) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [totalPages]);

  return (
    <div ref={containerRef} className="relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: 'translateY(-' + (pageIndex * groupHeight).toString() + 'px)'
        }}
      >
        {Array.from({ length: totalPages }).map(function (_, groupIndex) {
          const groupItems = allItems.slice(
            groupIndex * pageSize,
            groupIndex * pageSize + pageSize
          );

          return (
            <div key={groupIndex} className="grid grid-cols-2 gap-4 h-[500px]">
              {groupItems.map(function (item) {
                return (
                  <InventoryBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    max={item.max}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
