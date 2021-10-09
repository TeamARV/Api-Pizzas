import Express from 'express';
import { queryAllProductos , crearProducto, editarProducto, deletearProducto, editarProductoPorID } from '../../controladores/productos/controlador.js';


const rutasProducto = Express.Router(); 

const respuestagenericacallback = (res) =>(err,result) =>{
        if(err){
            res.status(500).send("error 400 al consultar productos")
        }

        else{
            res.json(result);
        }
};

rutasProducto.route("/productos").get((req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
    queryAllProductos(respuestagenericacallback(res));
  
});


rutasProducto.route('/productos/nuevo').post((req, res) => {
  crearProducto (req.body,respuestagenericacallback(res))
});


rutasProducto.route('/productos/edita').patch((req, res) => {
editarProducto(req.body,respuestagenericacallback(res))


}); 

rutasProducto.route('/productos/borra').delete((req, res) => {
deletearProducto(req.body.id,respuestagenericacallback(res));

}); 

//////////////////////// pruebas

rutasProducto.route("/productos").get((req,res)=>{
  console.log("alguien hizo get en la ruta /productos")
  queryAllProductos(respuestagenericacallback(res));

});


rutasProducto.route('/productos').post((req, res) => {
crearProducto (req.body,respuestagenericacallback(res))
});


rutasProducto.route('/productos/:id').patch((req, res) => {
editarProductoPorID(req.params.id,req.body,respuestagenericacallback(res))


}); 

rutasProducto.route('/productos/:id').delete((req, res) => {
deletearProducto(req.params.id,respuestagenericacallback(res));

}); 
////////////////////////

export default rutasProducto;