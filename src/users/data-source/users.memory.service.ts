import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from '../model/user';
import { CreateUserInput } from '../dto/createUserInput';
import { UserService } from '../users.service';

@Injectable()
export class UserMemoryService implements UserService {
  private users: User[] = [
    plainToClass(User, {
      id: 1,
      username: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  private nextId = 2;

  public find(): User[] | [] {
    return this.users;
  }

  public findMany(ids: number[]): User[] {
    return this.users.filter(x => ids.some(y => x.id === y));
  }

  public findById(id: number): User | null {
    return this.users.find(x => x.id === id);
  }

  public findByUsernameAndPassword(username: string, password: string): User | null {
    return this.users.find(
      x => x.username === username && x.password === password,
    );
  }

  public findByUsername(username: string): User | null {
    return this.users.find(x => x.username === username);
  }

  public create(createUser: CreateUserInput): User {
    const user = plainToClass(User, {
      ...createUser,
      id: this.nextId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.users.push(user);
    this.nextId++;
    return user;
  }
}
