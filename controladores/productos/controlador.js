import { obtenerBaseDatos } from '../../db/db.js';
import { ObjectId } from 'mongodb';




const queryAllProductos = async (callback)=>{
    const conexion = obtenerBaseDatos()
    await conexion.collection("producto").find({}).limit(100).toArray(callback);
    //en el find puedo meter filtros estado:"pendiente"
};


const traerONEproduct = async ( id,callback) =>{
  const conexion = obtenerBaseDatos()
  await conexion.collection("producto").findOne({_id: new ObjectId(id)},callback);
}


const crearProducto = async (datosProducto,callback) =>{
    

      if (
        Object.keys(datosProducto).includes('idProducto') &&
        Object.keys(datosProducto).includes('descripcionProducto') &&
        Object.keys(datosProducto).includes('valorProducto') &&
        Object.keys(datosProducto).includes('inventarioProducto')
      ) {
        // implementar código para crear  en la BD
        const conexion = obtenerBaseDatos()
        await conexion.collection('producto').insertOne(datosProducto, callback) 
       
      } else {
    return "erro";
      }

};


const editarProducto = async (datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(datosEdita.id)} // es el filtro para ubicar el coso a borrar 
    delete datosEdita.id
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('producto').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


const deletearProducto = async (id, callback) =>{

    const conexion = obtenerBaseDatos()
    const idBorra = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    await conexion.collection("producto").deleteOne(idBorra,callback);
};
   
///////pruebas

 const editarProductoPorID = async (id,datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('producto').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


 





export {queryAllProductos,crearProducto,editarProducto,deletearProducto,editarProductoPorID,traerONEproduct};