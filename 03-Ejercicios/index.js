//Configuracion
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const api = express()
const PORT = process.env.PORT || 3000

//Conexion a Base de Datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(() => console.log('Error connecting to database...'))
/*
1) Crear una base de datos para un supermercado que pueda 
    almacenar lo siguiente:
    - Artículo
        -Nombre (string)
        -Precio (number)
        -Existencias (number)
    - Ticket
        -subtotal (number)
        -IVA (number)
        -total (number)
        -articulos (articulo)
*/
//Generar esquema Articulo
const articuloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    existencias: {
        type: Number,
        required: true,
    },
})
//Generar esquema Ticket
const ticketSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        required: true,
    },
    IVA: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    articulos: {
        type: [articuloSchema],
        required: true,
    },
})
//Generar un modelo a partir del esquema Articulo
const Articulos = mongoose.model('Articulos', articuloSchema)
//Generar un modelo a partir del esquema Ticket
const Tickets = mongoose.model('Tickets', ticketSchema)

/*
   2) Crear una API que permita realizar las operaciones      
       elementales CRUD sobre artículos y ticket.
*/
api.use(express.urlencoded({ extended: true}))
api.use(express.json({ extended: true}))

//Endpoints
api.get('/', (_, res) => res.status(200).json({message: "Inicio Supermercado!"}))

//Create
// Articulo
api.post('/api/articulos', (req, res) => {
    //1) Recibir la informacion del articulo que se quiere crear desde el cliente
    const { body } = req
    //2) Pedirle a la base da datos que cree un nuevo documento a partir del body del cliente
    const newArticulos = new Articulos(body)
    newArticulos.save()
    //3) Con la respuesta que recibamos de la base de datos, le respondemos al cliente
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err))
})
// Ticket
api.post('/api/tickets', (req, res) => {
    //1) Recibir la informacion de vuelo que se quiere crear desde el cliente
    const { body } = req
    //2) Pedirle a la base da datos que cree un nuevo documento a partir del body del cliente
    const newTickets = new Tickets(body)
    newTickets.save()
    //3) Con la respuesta que recibamos de la base de datos, le respondemos al cliente
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Read All
// Articulo
api.get('/api/articulos', (req, res) => {
    Articulos.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})
// Ticket
api.get('/api/tickets', (req, res) => {
    Tickets.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Read One
// Articulo
api.get('/api/articulos/:id', (req, res) => {
    Articulos.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})
// Ticket
api.get('/api/tickets/:id', (req, res) => {
    Tickets.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Update
// Articulo
api.patch('/api/articulos/:id', (req, res) => {
    Articulos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})
// Ticket
api.patch('/api/tickets/:id', (req, res) => {
    Tickets.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Delete
// Articulo
api.delete('/api/articulos/:id', (req, res) => {
    Articulos.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err))
})
// Ticket
api.delete('/api/tickets/:id', (req, res) => {
    Tickets.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err))
})




/*
   3) Crear archivos de routes distintos para las operaciones de tickets y productos
   4) Mediante un ENDPOINT calcular el subtotal, IVA y total de
       algún ticket.
    
    COMO REGLA DE NEGOCIO los documentos “Ticket” deben inicializar
    subtotal, IVA y total con un valor default en 0.
    NOTA: Al hacer la petición del paso 4) se debe actualizar
    el contenido del ticket según los artículos que contenga
   5) Deploy con Heroku
   6) En la raíz del server devolver una vista, documentar la API utilizando HTML y CSS, puedes utilizar Bootstrap, Materialize, Bulma, etc (No jQuery)
*/




//Encender el servidor
api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))

