import { afterEach, beforeEach, expect, it, test, vi } from "vitest";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "Academia teste",
      Description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "userId-01",
      userLatitude: -6.2621963,
      userLongitude: -38.4493374,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 8, 2, 18, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "userId-01",
      userLatitude: -6.2621963,
      userLongitude: -38.4493374,
    });

    expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "userId-01",
        userLatitude: -6.2621963,
        userLongitude: -38.4493374,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 8, 2, 18, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "userId-01",
      userLatitude: -6.2621963,
      userLongitude: -38.4493374,
    });

    vi.setSystemTime(new Date(2024, 8, 3, 18, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "userId-01",
      userLatitude: -6.2621963,
      userLongitude: -38.4493374,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
