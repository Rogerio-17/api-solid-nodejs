import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUse } from "@/utils/test/create-and-authenticate-use";
import { title } from "process";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUse(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do Zé",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -6.2691042,
        longitude: -38.4555914,
      });

    expect(response.statusCode).toEqual(201);
  });
});
