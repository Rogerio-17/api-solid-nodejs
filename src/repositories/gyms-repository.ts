import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}
export interface GymsRepository {
  searchMany(query: string, page: number): Promise<Gym[]>;
  findById(gymId: string): Promise<Gym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
