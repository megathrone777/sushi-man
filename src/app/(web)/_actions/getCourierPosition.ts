"use server";
import { store } from "@/store";

const getCourierPosition = async (): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  const keys = await store.redis.keys("courier:*");
  const couriers = await Promise.all(
    keys.map((key: string) => store.redis.get<TCourierRecord>(key))
  );
  const courier = couriers
    .filter(
      (item): item is TCourierRecord =>
        !!item && Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
    )
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))[0];

  if (!courier || !Number.isFinite(courier.latitude) || !Number.isFinite(courier.longitude)) {
    return null;
  }

  return { latitude: courier.latitude, longitude: courier.longitude };
};

export { getCourierPosition };
