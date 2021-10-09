import { obtenerBaseDatos } from '../../db/db.js';
import { ObjectId } from 'mongodb';




const queryAllUsuarios = async (callback)=>{
    const conexion = obtenerBaseDatos()
    await conexion.collection("usuario").find({}).limit(100).toArray(callback);
    //en el find puedo meter filtros estado:"pendiente"
};


const traerONEuser = async ( id,callback) =>{
  const conexion = obtenerBaseDatos()
  await conexion.collection("usuario").findOne({_id: new ObjectId(id)},callback);
}


const crearUsuario = async (datosUsuario,callback) =>{
    

      if (
        Object.keys(datosUsuario).includes('nombreUsuario') &&
        Object.keys(datosUsuario).includes('numerodeIdentificacion') &&
        Object.keys(datosUsuario).includes('correoElectronico') &&
        Object.keys(datosUsuario).includes('password') &&
        Object.keys(datosUsuario).includes('rolUsuario') 
        
      ) {
        // implementar código para crear vehículo en la BD
        const conexion = obtenerBaseDatos()
        await conexion.collection('usuario').insertOne(datosUsuario, callback) 
       
      } else {
    return "erro";
      }

};


const editarUsuario = async (datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(datosEdita.id)} // es el filtro para ubicar el coso a borrar 
    delete datosEdita.id
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('usuario').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


const deletearUsuario = async (id, callback) =>{

    const conexion = obtenerBaseDatos()
    const idBorra = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    await conexion.collection("usuario").deleteOne(idBorra,callback);
};
   
///////pruebas

 const editarUsuarioPorID = async (id,datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('usuario').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


 





export {queryAllUsuarios,crearUsuario,editarUsuario,deletearUsuario,editarUsuarioPorID,traerONEuser};