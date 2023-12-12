import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

//El punto de arranque de la aplicacion es el app.ts que ejecuta una funcion anonima auto ejecutable que esta a su vez ejecuta el metodo estatico start() sin instanciar la clase Server que esta en la capa de presentacion

const main =async ()=>{
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}

(async() => {
   main();
})();




