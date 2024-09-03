import { beforeEach, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe } from "node:test";
import { hash } from "bcryptjs";
import { GetUseProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUseProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUseProfileUseCase(usersRepository);
  });

  it("should be able get the user by id", async () => {
    const createdUser = await usersRepository.create({
      name: "Teste Ts",
      email: "teste@teste.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Teste Ts");
  });

  it("should be able get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
