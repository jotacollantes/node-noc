import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // emailService.sendEmail({to:"jotajota18@hotmail.com",subject:"prueba",htmlBody:"<h3>Prueba</h3>"})

    //todo: Mandar email
    //Se crea una instancia del use-case SendEmailLogs y se le inyecta el emailService, y la implementaciondel 
    new SendEmailLogs(
      emailService,
      fileSystemLogRepository,
    ).execute(
      ['jjcollantes@reinec.com','jotajota18@hotmail.com']
    )

// emailService.sendEmailWithFileSystemLogs(["jotajota18@hotmail.com","juan@collantes.ec"]);
    
   
    
    
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      //     // new CheckService().execute( 'http://localhost:3000' );
    });
  }
}
