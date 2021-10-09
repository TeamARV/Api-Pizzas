import { obtenerBaseDatos } from '../../db/db.js';
import { ObjectId } from 'mongodb';




const queryAllVentas = async (callback)=>{
    const conexion = obtenerBaseDatos()
    await conexion.collection("venta").find({}).limit(100).toArray(callback);
    //en el find puedo meter filtros estado:"pendiente"
};


const traerONEVenta = async ( id,callback) =>{
  const conexion = obtenerBaseDatos()
  await conexion.collection("venta").findOne({_id: new ObjectId(id)},callback);
}


const crearVenta = async (datosVenta,callback) =>{
    

      if (
        Object.keys(datosVenta).includes('idVenta') &&
        Object.keys(datosVenta).includes('descripcionVenta') &&       //aqui voy editar segun la tabla que quiero
        Object.keys(datosVenta).includes('valorVenta') &&
        Object.keys(datosVenta).includes('inventarioVenta')
      ) {
        // implementar código para crear vehículo en la BD
        const conexion = obtenerBaseDatos()
        await conexion.collection('venta').insertOne(datosVenta, callback) 
       
      } else {
    return "erro";
      }

};


const editarVenta = async (datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(datosEdita.id)} // es el filtro para ubicar el coso a borrar 
    delete datosEdita.id
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('venta').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


const deletearVenta = async (id, callback) =>{

    const conexion = obtenerBaseDatos()
    const idBorra = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    await conexion.collection("venta").deleteOne(idBorra,callback);
};
   
///////pruebas

 const editarVentaPorID = async (id,datosEdita,callback) =>{

    const conexion = obtenerBaseDatos()
 
    const idEdita = {_id: new ObjectId(id)} // es el filtro para ubicar el coso a borrar 
    const atomicOperation = {$set:datosEdita,}
    await conexion.collection('venta').findOneAndUpdate(idEdita,atomicOperation,{upsert:true,returnOriginal:true} , callback);
    
};


 





export {queryAllVentas,crearVenta,editarVenta,deletearVenta,editarVentaPorID,traerONEVenta};