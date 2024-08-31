import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface getUseProfileUseCaseRequest {
  userId: string;
}

interface getUseProfileUseCaseResponse {
  user: User;
}

export class GetUseProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: getUseProfileUseCaseRequest): Promise<getUseProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
