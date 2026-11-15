"use client";
import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl/maplibre";

import { useRealtime } from "@/hooks";
import { Icon } from "@/ui";

import { CourierMarker } from "./CourierMarker";
import { DeliveryMarkers } from "./DeliveryMarkers";
import { FitBounds } from "./FitBounds";

import { markerClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: TLatLon = {
  lat: 50.0861328,
  lon: 14.4518119,
};
const pollIntervalMs: number = 10000;

const Map: React.FC<TProps> = ({ initialOrders }) => {
  const [couriers, setCouriers] = useState<TCourier[]>([]);
  const [orders, setOrders] = useState<TOrder[]>(initialOrders);

  const getPositions = (): [number, number][] => {
    // const deliveryPositions = orders
    //   .map(toDeliveryOrder)
    //   .filter(
    //     (order): order is NonNullable<ReturnType<typeof toDeliveryOrder>> =>
    //       order !== null && isPaymentVisible(order),
    //   )
    //   .map<[number, number]>(({ position }) => position);

    const courierPositions = couriers.map(({ latitude, longitude }): [number, number] => [
      latitude,
      longitude,
    ]);

    return [[kitchenCoords.lat, kitchenCoords.lon], ...courierPositions];
  };

  useRealtime({
    events: ["newOrder", "orderStatusChanged"],
    onData: ({ data, event }): void => {
      if (event === "newOrder") {
        if (data?.order) setOrders((prev) => [data.order, ...prev]);

        return;
      }

      if (event === "orderStatusChanged") {
        setOrders((prevOrders: TOrder[]) =>
          prevOrders.map<TOrder>((order: TOrder) =>
            order.id === data.id ? { ...order, status: data.status } : order
          )
        );
      }
    },
  });

  useEffect((): VoidFunction => {
    let active = true;

    let timeout: ReturnType<typeof setTimeout>;
    const poll = async (): Promise<void> => {
      try {
        const response = await fetch("/api/couriers", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Courier request failed with status ${response.status}`);
        }

        const data = (await response.json()) as TCourier[];

        if (active) setCouriers(data);
      } catch (error) {
        console.error("Courier position poll failed", error);
      }

      if (active) timeout = setTimeout(() => void poll(), pollIntervalMs);
    };

    void poll();

    return (): void => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <FitBounds positions={getPositions()} />

      {couriers.map<React.ReactElement>((courier: TCourier, index: number) => (
        <CourierMarker
          key={`courier-marker-${courier.id}`}
          {...{ index }}
          {...courier}
        />
      ))}

      <DeliveryMarkers {...{ orders }} />

      <Marker
        anchor="center"
        className={markerClass}
        latitude={kitchenCoords.lat}
        longitude={kitchenCoords.lon}
      >
        <Icon id="address" />
      </Marker>
    </>
  );
};

export { Map };
