import { beforeEach, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe } from "node:test";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Teste Ts",
      email: "teste@teste.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "teste@teste.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "teste@teste.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const hashPassword = await hash("123456", 6);

    await usersRepository.create({
      name: "Teste Ts",
      email: "teste@teste.com",
      password_hash: hashPassword,
    });

    await expect(() =>
      sut.execute({
        email: "teste@teste.com",
        password: "1234565555",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
