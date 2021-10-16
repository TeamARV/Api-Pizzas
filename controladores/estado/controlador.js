import { obtenerBaseDatos } from '../../db/db.js';
import { ObjectId } from 'mongodb';




const queryAllEstados = async (callback)=>{
    const conexion = obtenerBaseDatos()
    await conexion.collection("estado").find({}).limit(100).toArray(callback);
    //en el find puedo meter filtros estado:"pendiente"
};


const traerONEestado = async ( id,callback) =>{
  const conexion = obtenerBaseDatos()
  await conexion.collection("estado").findOne({_id: new ObjectId(id)},callback);
}


const crearEstado = async (datosEstado,callback) =>{
    

      if (
        Object.keys(datosEstado).includes('ValorEstado') 
 
        
      ) {
        // implementar código para crear  en la BD
        const conexion = obtenerBaseDatos()
        await conexion.collection('estado').insertOne(datosEstado, callback) 
       
      } else {
    return "erro";
      }

};


const editarEstado = async (datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(datosEdita.id)} // es el filtro para ubicar el coso a borrar 
    delete datosEdita.id
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('estado').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


const deletearEstado = async (id, callback) =>{

    const conexion = obtenerBaseDatos()
    const idBorra = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    await conexion.collection("estado").deleteOne(idBorra,callback);
};
   
///////pruebas

 const editarEstadoPorID = async (id,datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('estado').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


 





export {queryAllEstados,crearEstado,editarEstado,deletearEstado,editarEstadoPorID,traerONEestado};