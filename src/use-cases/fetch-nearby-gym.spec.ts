import { beforeEach, expect, it } from "vitest";
import { describe } from "node:test";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gym Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      Description: "Academia focada em conceitos e pratica",
      phone: "84981301382",
      latitude: -6.2691042,
      longitude: -38.4555914,
    });

    await gymRepository.create({
      title: "Far Gym",
      Description: "Academia focada em conceitos e pratica",
      phone: "84981301382",
      latitude: -6.0557665,
      longitude: -38.4656968,
    });

    const { gyms } = await sut.execute({
      userLatitude: -6.2621963,
      userLongitude: -38.4493374,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
