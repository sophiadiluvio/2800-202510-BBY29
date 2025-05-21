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
  // Track the current scroll "page"
  const [pageIndex, setPageIndex] = useState(0);

  // Ref to the scrollable container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Collect all inventory items with valid data
  const allItems: InventoryItem[] = [];

  for (let i = 0; i < SHELTER_CATEGORIES.length; i++) {
    const label = SHELTER_CATEGORIES[i];
    const value = props.shelter.inv?.[label];
    const max = props.shelter.max?.[label];

    // Only include items with non-zero max
    if (value != null && max != null && max !== 0) {
      allItems.push({ label: label, value: value, max: max });
    }
  }

  // Each page can show up to 4 bars
  const pageSize = 4;
  const totalPages = Math.ceil(allItems.length / pageSize);

  // Fixed vertical height per page group
  const groupHeight = 620;

  // Handle mouse scroll to change pages
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.deltaY > 30) {
        // Scroll down
        setPageIndex(function (prev) {
          if (prev < totalPages - 1) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      } else {
        if (e.deltaY < -30) {
          // Scroll up
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

    // Add and clean up wheel listener
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
    // Outer scrollable container with fixed height
    <div ref={containerRef} className="relative h-[620px] overflow-hidden">
      <div
        // Animate scrolling between groups
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: 'translateY(-' + (pageIndex * groupHeight).toString() + 'px)'
        }}
      >
        {/* Render one group per page */}
        {Array.from({ length: totalPages }).map(function (_, groupIndex) {
          const groupItems = allItems.slice(
            groupIndex * pageSize,
            groupIndex * pageSize + pageSize
          );

          return (
            // Fixed height grid per group
            <div
              key={groupIndex}
              className="grid grid-cols-2 gap-4"
              style={{
                height: `${groupHeight}px`,
                alignContent: 'start' // prevent empty slots from stretching full height
              }}
            >
              {/* Render up to 4 InventoryBars per group */}
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
