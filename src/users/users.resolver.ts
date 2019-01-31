import {
  Root,
  FieldResolver,
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'nest-type-graphql';
import { User } from './model/user';
import { UserService } from './users.service';
import { CreateUserInput } from './dto/createUserInput';
import { HttpException } from '@nestjs/common';
import { LoginInput } from './dto/loginInput';
import { Token } from './dto/token';
import { TokenService } from './token.service';
import { ReservationService } from 'src/reservations/reservation.service';
import { Reservation } from 'src/reservations/model/reservation';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly reservationService: ReservationService,
  ) {}

  @Query(returns => [User], { name: 'users' })
  users(): User[] {
    return this.userService.find();
  }

  @Mutation(returns => User)
  register(@Arg('data') createUser: CreateUserInput): User {
    if (this.userService.findByUsername(createUser.username) !== undefined) {
      throw new HttpException('This username is taken', 400);
    }
    const user = this.userService.create(createUser);
    return user;
  }

  @Mutation(returns => Token)
  login(@Arg('data') loginInput: LoginInput): Token {
    const user = this.userService.findByUsernameAndPassword(
      loginInput.username,
      loginInput.password,
    );
    if (user === undefined) {
      throw new HttpException('username/password are invalid', 401);
    }
    const token = this.tokenService.create(user);
    return token;
  }

  @FieldResolver(returns => [Reservation])
  reservations(@Root() user: User): Reservation[] {
    return this.reservationService.findByUserId(user.id);
  }
}
