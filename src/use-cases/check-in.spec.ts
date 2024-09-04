import { afterEach, beforeEach, expect, it, test, vi } from "vitest";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Academia teste",
      Description: "",
      phone: "",
      latitude: -6.2621963,
      longitude: -38.4493374,
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
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

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Academia teste",
      Description: "",
      phone: "",
      latitude: new Decimal(-6.2154541),
      longitude: new Decimal(-38.5032102),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "userId-02",
        userLatitude: -6.2621963,
        userLongitude: -38.4493374,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
