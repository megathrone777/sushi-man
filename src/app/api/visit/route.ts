import { type NextRequest, NextResponse } from "next/server";

import { store } from "@/store";

const allowedOrigin: string = "https://spritely.pro";

const cors = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": allowedOrigin,
};

type VisitPayload = {
  lang: string;
  path: string;
  ref: null | string;
  referrer: null | string;
  tz: string;
  visitorId: string;
  width: number;
};

const isVisitPayload = (value: unknown): value is VisitPayload => {
  if (!value || typeof value !== "object") return false;

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.visitorId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      payload.visitorId
    ) &&
    typeof payload.lang === "string" &&
    payload.lang.length <= 64 &&
    typeof payload.path === "string" &&
    payload.path.length <= 2048 &&
    (payload.ref === null || (typeof payload.ref === "string" && payload.ref.length <= 512)) &&
    (payload.referrer === null ||
      (typeof payload.referrer === "string" && payload.referrer.length <= 2048)) &&
    typeof payload.tz === "string" &&
    payload.tz.length <= 128 &&
    typeof payload.width === "number" &&
    Number.isInteger(payload.width) &&
    payload.width >= 0 &&
    payload.width <= 100_000
  );
};

export const OPTIONS = (): Response => new Response(null, { headers: cors });

export const POST = async (request: NextRequest): Promise<Response> => {
  let payload: unknown;

  try {
    payload = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({}, { headers: cors, status: 400 });
  }

  if (!isVisitPayload(payload)) {
    return NextResponse.json({}, { headers: cors, status: 400 });
  }

  const { lang, tz, visitorId, width } = payload;
  const stored = await store.redis.hsetnx(
    "visits",
    visitorId,
    JSON.stringify({ firstSeen: new Date().toISOString(), lang, tz, width })
  );

  return NextResponse.json({ stored: stored === 1 }, { headers: cors });
};
