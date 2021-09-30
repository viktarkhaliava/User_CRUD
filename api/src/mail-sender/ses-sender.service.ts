import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as aws from 'aws-sdk';

aws.config.update({ region: process.env.AWS_SES_REGION });

@Injectable()
export class SESSenderService {
    constructor(
    ) {}

    mailName = 'donotreply@admin.com';

    public adjustTemplateData(templateData: any): string {
        const props = Object.entries(templateData).map(([key, value]) => `\"${key}\":\"${value}\"`);
        return `{ ${props.join(',')} }`;
    }

    public async sendMail(email: string, mailTemplate: string, templateData: any): Promise<any> {
        const params = {
            Destination: { ToAddresses: [email] },
            Source: this.mailName,
            Template: mailTemplate,
            TemplateData: this.adjustTemplateData(templateData),
            ReplyToAddresses: [this.mailName],
        }
        const sendPromise = new aws.SES({ apiVersion: '2010-12-01', region: 'region', credentials: { accessKeyId: 'key', secretAccessKey: 'secret' } }).sendTemplatedEmail(params).promise();
        return sendPromise.then((data) => {
            return data;
        }).catch((err) => {
            return err;
        });
    }
    
    public async sendMails(mailTemplate: string, emailsData: any[]): Promise<any> {
        const params = {
            Source: this.mailName,
            Template: mailTemplate,
            Destinations: emailsData.map((item) => {
                const { email, ...rest } = item;
                return { Destination: { ToAddresses: [email] }, ReplacementTemplateData: this.adjustTemplateData(rest) };
            }),
            DefaultTemplateData: this.adjustTemplateData({ name: 'user' }),
        }
        const sendPromise = new aws.SES({ apiVersion: '2010-12-01', region: 'region', credentials: { accessKeyId: 'key', secretAccessKey: 'secret' } }).sendBulkTemplatedEmail(params).promise();
        sendPromise.then((data) => {
            console.log(data);
        }).catch((err) => {
            console.error(err, err.stack);
        });
    }
}