import { Server } from './presentation/server';

//El punto de arranque de la aplicacion es el app.ts que ejecuta una funcion anonima auto ejecutable que esta a su vez ejecuta el metodo estatico start() sin instanciar la clase Server que esta en la capa de presentacion
(async() => {
  main();
})();


function main(){
  Server.start();
}


