import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// el dato SeverityLevel es importado desde @prisma/client
const severityEnum= {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

const prismaClient = new PrismaClient();
export class PostgresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    //Esta es otra manera de obtener el severityLevel de postgres
    const localSeverity=severityEnum[log.level] 
    const newLog = await prismaClient.logModel.create({
      data: {
        level:
          log.level === "high"
            ? SeverityLevel.HIGH
            : log.level === "medium"
            ? SeverityLevel.MEDIUM
            : SeverityLevel.LOW,
        message: log.message,
        origin: log.origin,
      },
    });
    //throw new Error("Method not implemented.");
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    //const levelFilter=severityEnum[severityLevel] 
    const levelFilter =
      severityLevel === "high"
        ? SeverityLevel.HIGH
        : severityLevel === "medium"
        ? SeverityLevel.MEDIUM
        : SeverityLevel.LOW;
    const logs = await prismaClient.logModel.findMany({
      where: { level: levelFilter },
    });

    return logs.map(LogEntity.fromObject);
    //throw new Error("Method not implemented.");
  }
}
