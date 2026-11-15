import { type NextRequest, NextResponse } from "next/server";

import { store } from "@/store";
import { pragueDay, toCourierStats } from "@/utils";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const sessionId = request.cookies.get("session")?.value;
  const session = sessionId ? await store.sessions.getById(sessionId) : null;

  if (!session) return NextResponse.json({}, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({}, { status: 403 });

  const keys = (await store.redis.keys("courier:*")).sort();

  if (keys.length === 0) return NextResponse.json([]);

  const day: string = pragueDay();

  const couriers = (
    await Promise.all(
      keys.map(async (key: string): Promise<null | TCourier> => {
        const id: string = key.replace("courier:", "");

        const [courier, stats] = await Promise.all([
          store.redis.get<TCourier>(key),
          store.redis.hgetall<Record<string, unknown>>(`stats:${day}:${id}`),
        ]);

        if (!courier) return null;

        return {
          ...courier,
          id,
          stats: toCourierStats(stats),
        };
      })
    )
  ).filter(
    (courier: null | TCourier): courier is TCourier =>
      courier !== null && Number.isFinite(courier.latitude) && Number.isFinite(courier.longitude)
  );

  return NextResponse.json(couriers);
};
