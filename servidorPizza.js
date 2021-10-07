
/* const express = require('express'); */  //imports antiguos

import  Express  from "express";


const app = Express()

app.use(Express.json())  // agregar utilidad para manejar json


//ruta lectura  get :D

app.get("/productos" , (req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
    const productos =
    [
      { idProducto: 1, descripcionProducto: "Slim Pizza", valorProducto: 20000, inventarioProducto: 10 },
      { idProducto: 2, descripcionProducto: "Mini Pizza", valorProducto: 15000, inventarioProducto: 10 },
      { idProducto: 3, descripcionProducto: "Classic Pizza", valorProducto: 30000, inventarioProducto: 10 },
      { idProducto: 4, descripcionProducto: "Mega Pizza", valorProducto: 50000, inventarioProducto: 10 },
      { idProducto: 5, descripcionProducto: "Nerd Pizza", valorProducto: 60000, inventarioProducto: 10 },

    ]
    res.send(productos)
} )
//------------------------

app.post("/productos/nuevo", (req,res) =>{
    // agregar codigo para crear producto

    console.log(req.body)
    const datosProducto=req.body
    console.log("llaves ", Object.keys(datosProducto))

   //////// test de validacion 

/*     if( Object.keys(datosProducto).includes('idProducto') ) 
      {
        res.sendStatus(200);
      }
      else{
        res.sendStatus(500);
      } */

///////////


    console.log("desde -> ", req.hostname)
    res.send("ok, Producto creado")

})



app.listen(5000,()=>{
    console.log("escuchando en puerto 5000 ")
})