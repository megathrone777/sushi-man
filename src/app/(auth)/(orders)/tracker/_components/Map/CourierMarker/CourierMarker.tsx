import React from "react";
import { Marker } from "react-map-gl/maplibre";

import {
  headingClass,
  iconClass,
  layoutClass,
  speedClass,
  textClass,
  tooltipClass,
  wrapperClass,
} from "./CourierMarker.css";

import type { TProps } from "./CourierMarker.types";

const CourierMarker: React.FC<TProps> = ({
  heading,
  id,
  index,
  latitude,
  longitude,
  speed,
  stats,
}) => (
  <Marker
    key={`${id}-courier-marker`}
    {...{ latitude, longitude }}
    anchor="center"
    className={wrapperClass}
  >
    <svg
      className={iconClass}
      height={30}
      viewBox="0 0 24 24"
      width={30}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16
          10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4
          2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2
        "
      />

      <circle
        cx="7"
        cy="17"
        r="2"
      />

      <path d="M9 17h6" />

      <circle
        cx="17"
        cy="17"
        r="2"
      />

      <text
        className={textClass}
        dy=".35em"
        textAnchor="middle"
        x="11"
        y="13"
      >
        {index + 1}
      </text>
    </svg>

    <span
      className={layoutClass}
      style={{
        transform: `rotate(${heading ?? 0}deg)`,
      }}
    >
      <span className={headingClass} />
    </span>

    {!!speed && <span className={speedClass}>{speed} km/h</span>}

    {!!stats && (
      <span className={tooltipClass}>
        <span>max {stats.maxSpeed} km/h</span>
        <span>{(stats.distance / 1000).toFixed(1)} km</span>
      </span>
    )}
  </Marker>
);

export { CourierMarker };
