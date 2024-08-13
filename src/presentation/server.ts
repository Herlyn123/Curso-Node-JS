import { FileSystemDatasource } from './../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { CronService } from './cron/cron-service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogServerityLevel } from '../domain/entities/log.entity';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');

        // Mandar email

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['herlindavid269@gmail.com', 'herlindavid269@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //     ['herlindavid269@gmail.com', 'herlindavid269@gmail.com']
        // );

        // const logs = await logRepository.getLogs(LogServerityLevel.low);
        // console.log(logs);

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
                
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error),
        //             ).execute(url);
        //     }
        // );
    }
}