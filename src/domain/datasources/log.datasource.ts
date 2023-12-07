import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogDatasource {
  //Cualquier origen de datos va a tener que implementar los siguientes metodos
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}


