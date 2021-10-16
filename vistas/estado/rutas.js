import Express from 'express';
import { queryAllEstados , crearEstado, editarEstado, deletearEstado, editarEstadoPorID, traerONEestado } from '../../controladores/estado/controlador.js';


const rutasEstado = Express.Router(); 

const respuestagenericacallback = (res) =>(err,result) =>{
        if(err){
            res.status(500).send("error 400 al consultar estados")
        }

        else{
            res.json(result);
        }
};

////////////

rutasEstado.route("/estados/:id").get((req,res)=>{
  console.log("alguien hizo get en la ruta /estados")
  traerONEestado(req.params.id,respuestagenericacallback(res));

});

/////////////
rutasEstado.route("/estados").get((req,res)=>{
    console.log("alguien hizo get en la ruta /estados")
    queryAllEstados(respuestagenericacallback(res));
  
});


rutasEstado.route('/estados/nuevo').post((req, res) => {
  crearEstado (req.body,respuestagenericacallback(res))
});


rutasEstado.route('/estados/edita').patch((req, res) => {
editarEstado(req.body,respuestagenericacallback(res))


}); 

rutasEstado.route('/estados/borra').delete((req, res) => {
deletearEstado(req.body.id,respuestagenericacallback(res));

}); 

//////////////////////// pruebas

rutasEstado.route("/estados").get((req,res)=>{
  console.log("alguien hizo get en la ruta /estados")
  queryAllEstados(respuestagenericacallback(res));

});


rutasEstado.route('/estados').post((req, res) => {
crearEstado (req.body,respuestagenericacallback(res))
});


rutasEstado.route('/estados/:id').patch((req, res) => {
editarEstadoPorID(req.params.id,req.body,respuestagenericacallback(res))


}); 

rutasEstado.route('/estados/:id').delete((req, res) => {
deletearEstado(req.params.id,respuestagenericacallback(res));

}); 
////////////////////////

export default rutasEstado;
