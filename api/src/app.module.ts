import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [UsersModule, MailSenderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
