import { Injectable } from '@nestjs/common';
import { User } from './model/user';
import { CreateUserInput } from './dto/createUserInput';

@Injectable()
export abstract class UserService {

  abstract find(): User[] | [];

  abstract findMany(ids: number[]): User[];

  abstract findById(id: number): User | null;

  abstract findByUsernameAndPassword(username: string, password: string): User | null;

  abstract findByUsername(username: string): User | null;

  abstract create(createUser: CreateUserInput): User;
}
