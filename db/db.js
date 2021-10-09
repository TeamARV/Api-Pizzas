import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config({ path: './datos.env' });
const stringConexion = process.env.basedatosUrl;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let conexion;

  const conectarBaseDatos = (callback) =>{

    client.connect((err, db) => {
        if (err) {
          console.error('Error conectando a la base de datos');
          return 'error';
        }
        conexion = db.db('ProyectoPizzeria');
        console.log('baseDeDatos exitosa');
        return callback(); 
        });
      };

const obtenerBaseDatos =()=>{
        return conexion
      };

export {conectarBaseDatos,obtenerBaseDatos};

  

  