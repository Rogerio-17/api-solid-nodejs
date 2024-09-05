import { beforeEach, expect, it } from "vitest";
import { describe } from "node:test";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymRepository.create({
      title: "Academia JavaScript",
      Description: "Academia focada em conceitos e pratica",
      phone: "84981301382",
      latitude: -6.2691042,
      longitude: -38.4555914,
    });

    await gymRepository.create({
      title: "Academia TypeScript",
      Description: "Academia focada em conceitos e pratica",
      phone: "84981301382",
      latitude: -6.2691042,
      longitude: -38.4555914,
    });

    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia TypeScript" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Academia TypeScript ${i}`,
        Description: "Academia focada em conceitos e pratica",
        phone: "84981301382",
        latitude: -6.2691042,
        longitude: -38.4555914,
      });
    }

    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia TypeScript 21" }),
      expect.objectContaining({ title: "Academia TypeScript 22" }),
    ]);
  });
});
