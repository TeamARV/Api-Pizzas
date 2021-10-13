
/* const express = require('express'); */  //imports antiguos

import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

import cors from 'cors';





//instanciamos la clase mongo



const stringConexion = '';

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/////

let conexion;
const app = Express()

app.use(Express.json())  // agregar utilidad para manejar json
app.use(cors());         // inicializo el cors que me permite peticiones de fuentes distintas

// opciones orm :  mongoose, prisma // pero vamos usar nativo de mongodb driver

//ruta lectura  get :D

app.get("/productos" , (req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
 
    conexion.collection("producto").find({}).limit(100).toArray( (err,result) =>{

        if(err){
            res.status(500).send("error 400 al consultar productos")
        }

        else{
            res.json(result)
        }
    })
  
} )
//------------------------

app.post('/productos/nuevo', (req, res) => {
    console.log(req.body);
    const datosProducto = req.body;
    console.log('llaves: ', Object.keys(datosProducto));

    
    
    try {
      if (
        Object.keys(datosProducto).includes('idProducto') &&
        Object.keys(datosProducto).includes('descripcionProducto') &&
        Object.keys(datosProducto).includes('valorProducto') &&
        Object.keys(datosProducto).includes('inventarioProducto')
      ) {
        // implementar código para crear vehículo en la BD
        conexion.collection('producto').insertOne(datosProducto, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        });
      } else {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(500);
    }
  });



app.patch('/productos/edita', (req, res) => {

    const datosEdita = req.body;
    console.log(datosEdita)
    const idEdita = {_id: new ObjectId(datosEdita.id)} // es el filtro para ubicar el coso a borrar 
    delete datosEdita.id
    const atomicOperation = {$set:datosEdita,}
    conexion.collection('producto').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , (err,result) =>{

        if(err){
            console.error("error en la edicion del producto" , err)
            res.sendStatus(500)
        }
        else{
            console.error("editado con exito :D" )
            res.sendStatus(200)
        }
    
    });  


}); 

app.delete('/productos/borra', (req, res) => {

    const datosBorra = req.body;
    console.log(datosBorra)
    const idBorra = {_id: new ObjectId(datosBorra.id)} // es el filtro para ubicar el coso a borrar 
    conexion.collection("producto").deleteOne(idBorra,(err,result)=>{

        if(err){
            console.error("error al deletear producto" , err)
            res.sendStatus(500)

        }
        else{
            console.error("error al deletear producto" , err)
            res.sendStatus(200)
        }
    });



}); 


//ciclo 

const main = () => {
    client.connect((err, db) => {
      if (err) {
        console.error('Error conectando a la base de datos');
        return 'error';
      }
      conexion = db.db('ProyectoPizzeria');
      console.log('baseDeDatos exitosa');
      return app.listen(5000, () => {
        console.log('escuchando puerto 5000');
      });
    });
  };
  
  main();


    

