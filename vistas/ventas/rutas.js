import Express from 'express';
import { queryAllVentas , crearVenta, editarVenta, deletearVenta, editarVentaPorID, traerONEVenta } from '../../controladores/ventas/controlador.js';


const rutasVenta = Express.Router(); 

const respuestagenericacallback = (res) =>(err,result) =>{
        if(err){
            res.status(500).send("error 400 al consultar ventas")
        }

        else{
            res.json(result);
        }
};

////////////

rutasVenta.route("/ventas/:id").get((req,res)=>{
  console.log("alguien hizo get en la ruta /ventas")
  traerONEVenta(req.params.id,respuestagenericacallback(res));

});

/////////////
rutasVenta.route("/ventas").get((req,res)=>{
    console.log("alguien hizo get en la ruta /ventas")
    queryAllVentas(respuestagenericacallback(res));
  
});


rutasVenta.route('/ventas/nuevo').post((req, res) => {
  crearVenta (req.body,respuestagenericacallback(res))
});


rutasVenta.route('/ventas/edita').patch((req, res) => {
editarVenta(req.body,respuestagenericacallback(res))


}); 

rutasVenta.route('/ventas/borra').delete((req, res) => {
deletearVenta(req.body.id,respuestagenericacallback(res));

}); 

//////////////////////// pruebas

rutasVenta.route("/ventas").get((req,res)=>{
  console.log("alguien hizo get en la ruta /ventas")
  queryAllVentas(respuestagenericacallback(res));

});


rutasVenta.route('/ventas').post((req, res) => {
crearVenta (req.body,respuestagenericacallback(res))
});


rutasVenta.route('/ventas/:id').patch((req, res) => {
editarVentaPorID(req.params.id,req.body,respuestagenericacallback(res))


}); 

rutasVenta.route('/ventas/:id').delete((req, res) => {
deletearVenta(req.params.id,respuestagenericacallback(res));

}); 
////////////////////////

export default rutasVenta;
