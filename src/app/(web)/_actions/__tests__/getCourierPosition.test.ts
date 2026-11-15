import { beforeEach, describe, expect, it } from "@jest/globals";

import { store } from "@/store";

import { getCourierPosition } from "../getCourierPosition";

jest.mock("@/store", () => ({
  store: { redis: { get: jest.fn(), keys: jest.fn() } },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getCourierPosition", () => {
  it("returns the latest valid position without an order or courier id", async () => {
    jest.mocked(store.redis.keys).mockResolvedValue(["courier:device-1", "courier:device-2"]);
    jest.mocked(store.redis.get).mockImplementation((key: string) =>
      Promise.resolve({
        heading: null,
        id: key.replace("courier:", ""),
        latitude: key.endsWith("1") ? 50.1 : 50.2,
        longitude: 14.4,
        speed: null,
        updatedAt: key.endsWith("1") ? 100 : 200,
      })
    );

    await expect(getCourierPosition()).resolves.toEqual({
      latitude: 50.2,
      longitude: 14.4,
    });
    expect(store.redis.keys).toHaveBeenCalledWith("courier:*");
  });

  it("returns null when no usable courier position is available", async () => {
    jest.mocked(store.redis.keys).mockResolvedValue(["courier:device-id"]);
    jest.mocked(store.redis.get).mockResolvedValue({
      heading: null,
      id: "device-id",
      latitude: Number.NaN,
      longitude: 14.4,
      speed: null,
    });

    await expect(getCourierPosition()).resolves.toBeNull();
  });
});
