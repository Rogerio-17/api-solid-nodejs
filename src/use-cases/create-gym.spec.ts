import { beforeEach, expect, it } from "vitest";
import { describe } from "node:test";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Academia JavaScript",
      Description: "Academia focada em conceitos e pratica",
      phone: "84981301382",
      latitude: -6.2691042,
      longitude: -38.4555914,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
