import Express from 'express';
import { queryAllUsuarios , crearUsuario, editarUsuario, deletearUsuario, editarUsuarioPorID, traerONEuser } from '../../controladores/usuarios/controlador.js';


const rutasUsuario = Express.Router(); 

const respuestagenericacallback = (res) =>(err,result) =>{
        if(err){
            res.status(500).send("error 400 al consultar usuarios")
        }

        else{
            res.json(result);
        }
};

////////////

rutasUsuario.route("/usuarios/:id").get((req,res)=>{
  console.log("alguien hizo get en la ruta /usuarios")
  traerONEuser(req.params.id,respuestagenericacallback(res));

});

/////////////
rutasUsuario.route("/usuarios").get((req,res)=>{
    console.log("alguien hizo get en la ruta /usuarios")
    queryAllUsuarios(respuestagenericacallback(res));
  
});


rutasUsuario.route('/usuarios/nuevo').post((req, res) => {
  crearUsuario (req.body,respuestagenericacallback(res))
});


rutasUsuario.route('/usuarios/edita').patch((req, res) => {
editarUsuario(req.body,respuestagenericacallback(res))


}); 

rutasUsuario.route('/usuarios/borra').delete((req, res) => {
deletearUsuario(req.body.id,respuestagenericacallback(res));

}); 

//////////////////////// pruebas

rutasUsuario.route("/usuarios").get((req,res)=>{
  console.log("alguien hizo get en la ruta /usuarios")
  queryAllUsuarios(respuestagenericacallback(res));

});


rutasUsuario.route('/usuarios').post((req, res) => {
crearUsuario (req.body,respuestagenericacallback(res))
});


rutasUsuario.route('/usuarios/:id').patch((req, res) => {
editarUsuarioPorID(req.params.id,req.body,respuestagenericacallback(res))


}); 

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
deletearUsuario(req.params.id,respuestagenericacallback(res));

}); 
////////////////////////

export default rutasUsuario;
