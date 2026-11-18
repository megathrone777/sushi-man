import { beforeEach, describe, expect, it } from "@jest/globals";
import { NextRequest } from "next/server";

import { store } from "@/store";

import { OPTIONS, POST } from "../route";

jest.mock("@/store", () => ({
  store: { redis: { hsetnx: jest.fn() } },
}));

const payload = {
  lang: "en-US",
  path: "/",
  ref: null,
  referrer: null,
  tz: "Europe/Prague",
  visitorId: "123e4567-e89b-42d3-a456-426614174000",
  width: 1280,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/visit", () => {
  it("stores a new visitor in the visits hash", async () => {
    jest.mocked(store.redis.hsetnx).mockResolvedValue(1);

    const request = new NextRequest("https://sm-new-ten.vercel.app/api/visit", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    });

    const response = await POST(request);

    const call = jest.mocked(store.redis.hsetnx).mock.calls[0];

    if (!call) throw new Error("Expected Redis hsetnx to be called");

    const storedValue = call[2];

    if (typeof storedValue !== "string") throw new Error("Expected serialized visit data");

    const storedVisit = JSON.parse(storedValue) as Record<string, unknown>;

    expect(call[0]).toBe("visits");
    expect(call[1]).toBe(payload.visitorId);
    expect(storedVisit).toEqual({
      firstSeen: expect.any(String),
      lang: payload.lang,
      tz: payload.tz,
      width: payload.width,
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ stored: true });
  });

  it("does not overwrite an existing visitor", async () => {
    jest.mocked(store.redis.hsetnx).mockResolvedValue(0);

    const request = new NextRequest("https://sm-new-ten.vercel.app/api/visit", {
      body: JSON.stringify(payload),
      method: "POST",
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ stored: false });
  });

  it("rejects malformed or invalid payloads", async () => {
    const malformedRequest = new NextRequest("https://sm-new-ten.vercel.app/api/visit", {
      body: "{",
      method: "POST",
    });
    const invalidRequest = new NextRequest("https://sm-new-ten.vercel.app/api/visit", {
      body: JSON.stringify({ ...payload, visitorId: "not-a-uuid" }),
      method: "POST",
    });

    expect((await POST(malformedRequest)).status).toBe(400);
    expect((await POST(invalidRequest)).status).toBe(400);
    expect(store.redis.hsetnx).not.toHaveBeenCalled();
  });
});

describe("OPTIONS /api/visit", () => {
  it("returns CORS headers for preflight requests", () => {
    const response = OPTIONS();

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://spritely.pro");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
  });
});
