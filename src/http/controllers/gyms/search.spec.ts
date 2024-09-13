import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUse } from "@/utils/test/create-and-authenticate-use";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUse(app, true);

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

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do Zé",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -6.2691042,
        longitude: -38.4555914,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({ q: "Academia do Joe" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia do Joe",
      }),
    ]);
  });
});
