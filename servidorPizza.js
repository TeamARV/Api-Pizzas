
/* const express = require('express'); */  //imports antiguos

import Express from 'express';
import { conectarBaseDatos, obtenerBaseDatos } from './db/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import rutasProducto from './vistas/productos/rutas.js';
import rutasUsuario from './vistas/usuarios/rutas.js';
import rutasVenta from './vistas/ventas/rutas.js';
import rutasEstado from './vistas/estado/rutas.js';


dotenv.config({ path: './datos.env' });

/* const port = process.env.port || 5000; */


const app = Express()

app.use(Express.json())  // agregar utilidad para manejar json
app.use(cors());         // inicializo el cors que me permite peticiones de fuentes distintas

// opciones orm :  mongoose, prisma // pero vamos usar nativo de mongodb driver

app.use(rutasProducto)
app.use(rutasUsuario)
app.use(rutasVenta)
app.use(rutasEstado)




const main = () => {
  return app.listen(process.env.port, () => {
    console.log(`escuchando puerto ${process.env.port}`);
    });
  };
  
conectarBaseDatos(main)


    

