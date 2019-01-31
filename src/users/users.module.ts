import { Module, Global } from '@nestjs/common';
import { UserMemoryService } from './data-source/users.memory.service';
import { UserService} from './users.service';
import { UserResolver } from './users.resolver';
import { TokenService } from './token.service';
import { ReservationModule } from 'src/reservations/reservation.module';
import { UserLoader } from './user.dataloader';

@Global()
@Module({
  providers: [
    UserMemoryService,
    {provide: UserService, useClass: UserMemoryService},
    UserResolver,
    TokenService,
    UserLoader],
  imports: [ReservationModule],
  exports: [UserService, TokenService, UserLoader],
})
export class UserModule {}
