import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUse } from "@/utils/test/create-and-authenticate-use";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to list nearby a gyms", async () => {
    const { token } = await createAndAuthenticateUse(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do Joe",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -6.0557665,
        longitude: -38.4656968,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do Joe",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -6.2691042,
        longitude: -38.4555914,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -6.2691042,
        longitude: -38.4555914,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia do Joe",
      }),
    ]);
  });
});
