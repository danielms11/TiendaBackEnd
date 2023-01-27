require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/tienda"
const  PORT=process.env.PORT || 5000;



mongoose.connect(DB_URI)
    .then(db => console.log("Conectado a servidor BD"))
    .catch(error => console.log("Hubo un error", error))

app.use(express.static('public'))
app.use(express.json())

const Articulo = mongoose.model('Articulo', new mongoose.Schema(
    {
        nombre: {type: String, default: "Sin nombre"},
        precio: {type: Number, default: 0}
    }
))

app.get("/api/articulos", cors(), (req,res) => {
    Articulo.find(
        {},
        (error, data) => {if (error) res.json(error); else res.json(data)}
    )
})

app.post("/api/articulos", cors(), (req,res) => {
    const nuevoArticulo = new Articulo ({nombre: req.body.nombre, precio: req.body.precio})
    nuevoArticulo.save((error, data) => {if (error) res.json(error); else res.json(data)})
})



app.delete("/api/articulos/:id", cors(), (req,res) => {
    Articulo.findOneAndRemove(
        {_id: req.params.id},
        (error, data) => {if (error) res.json(error); else res.json(data)}
    )
})

app.put("/api/articulos/:id", cors(), (req,res) => {
    Articulo.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {nombre: req.body.nombre, precio: req.body.precio}},
        (error, data) => {if (error) res.json(error); else res.json(data)}
    )
})

app.listen(PORT, () => {console.log("Iniciado servidor web")})

/* const articulos= [
    {nombre: "Botas", precio:"2"},
    {nombre: "Botas", precio:"2"}
]



app.get ("/api/articulos", (req, res) => {
    res.json(articulos)
})

app.post ("/api/articulos", (req, res) => {
    articulos.push({nombre: req.body.nombre, precio: req.body.precio})
    res.json(articulos)
})

app.delete ("/api/articulos/:id", (req, res) => {
    //articulos = articulos.filter((value, index) => index != req.params.id );
    articulos.splice(req.params.id, 1)
    res.json(articulos)
})

app.put ("/api/articulos/:id", (req, res) => {
    articulos[req.params.id] = req.body;
    res.json(articulos)
}) */

