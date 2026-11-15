import { beforeEach, describe, expect, it } from "@jest/globals";
import { NextRequest } from "next/server";

import { store } from "@/store";

import { DELETE } from "../route";

jest.mock("@/store", () => ({
  store: { redis: { del: jest.fn() } },
}));

const secret = "test-courier-secret";

beforeEach(() => {
  jest.clearAllMocks();
  process.env.COURIER_API_SECRET = secret;
});

describe("DELETE /api/geo", () => {
  it("deletes the live courier key for an authenticated request", async () => {
    jest.mocked(store.redis.del).mockResolvedValue(1);

    const request = new NextRequest("http://localhost/api/geo?id=device-1", {
      headers: { "x-api-secret": secret },
      method: "DELETE",
    });

    const response = await DELETE(request);

    expect(store.redis.del).toHaveBeenCalledWith("courier:device-1");
    await expect(response.json()).resolves.toEqual({ deleted: true });
  });

  it("rejects requests without the courier secret", async () => {
    const request = new NextRequest("http://localhost/api/geo?id=device-1", {
      method: "DELETE",
    });

    const response = await DELETE(request);

    expect(response.status).toBe(401);
    expect(store.redis.del).not.toHaveBeenCalled();
  });

  it("rejects requests without a courier id", async () => {
    const request = new NextRequest("http://localhost/api/geo", {
      headers: { "x-api-secret": secret },
      method: "DELETE",
    });

    const response = await DELETE(request);

    expect(response.status).toBe(400);
    expect(store.redis.del).not.toHaveBeenCalled();
  });
});
