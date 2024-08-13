import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

interface Attachement{
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody, attachements=[] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            return true;
        } catch (error) {
            
            return false
        }
    }
    async sendEmailWithFileSystemLogs(to:string|string[]){
       const  subject = 'Aprendiendo a Enviar Emails';
       const htmlBody = `
        <h3>Aprendiendo a enviar correos electronicos</h3>
        <p>Esto es un correo electronico de pruebas donde estamos probando todo lo de enviar correos electronicos mendiante un programa que estoy haciendo</p>
        <p>Ver logs adjuntos</p>
        `;

        const attachements:Attachement[]=[
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        });
    }
}