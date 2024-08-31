import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const prismaUasersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUasersRepository);

  return registerUseCase;
}
