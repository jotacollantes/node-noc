import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasourse";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  //new MongoLogDatasource()
  //new PostgresLogDataSource()
);
const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // emailService.sendEmail({to:"jotajota18@hotmail.com",subject:"prueba",htmlBody:"<h3>Prueba</h3>"})

    //todo: Mandar email
    //Se crea una instancia del use-case SendEmailLogs y se le inyecta el emailService, y la implementaciondel
    new SendEmailLogs(emailService, logRepository).execute([
      "jjcollantes@reinec.com",
      "jotajota18@hotmail.com",
    ]);

    // emailService.sendEmailWithFileSystemLogs(["jotajota18@hotmail.com","juan@collantes.ec"]);

    //CronService.createJob("*/5 * * * * *", () => {
      //const url = "https://google.com";
      //new CheckService(
        //logRepository,
        //() => console.log(`${url} is ok`),
        //(error) => console.log(error)
      //).execute(url);
    //});


    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository,mongoLogRepository,postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
