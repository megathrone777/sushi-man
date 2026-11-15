"use client";
import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/maplibre";

import type React from "react";

type TProps = { positions: [number, number][] };

const FitBounds: React.FC<TProps> = ({ positions }) => {
  const { current: map } = useMap();
  const prevRef = useRef("");
  const positionKey = positions.map(([lat, lng]) => `${lat},${lng}`).join(";");

  useEffect(() => {
    if (!map || positions.length < 2 || positionKey === prevRef.current) return;
    prevRef.current = positionKey;

    const lats = positions.map(([lat]) => lat);
    const lngs = positions.map(([, lng]) => lng);

    map.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { maxZoom: 14, padding: 40 }
    );
  }, [map, positionKey, positions]);

  return null;
};

export { FitBounds };
