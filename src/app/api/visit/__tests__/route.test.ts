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

    expect(store.redis.hsetnx).toHaveBeenCalledWith(
      "visits",
      payload.visitorId,
      expect.stringContaining("\"lang\":\"en-US\"")
    );
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
