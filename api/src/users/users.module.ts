import { Module } from '@nestjs/common';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MailSenderModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
