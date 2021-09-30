import { Module } from '@nestjs/common';
import { SESSenderService } from './ses-sender.service';

@Module({
    providers: [SESSenderService],
    exports: [SESSenderService],
})
export class MailSenderModule {}
