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

//ODM -> Object Document Mapping
//ORM -> Object Relational Mapping

/*
Un aeropuerto busca controlar los vuelos que llegan al lugar, desea conocer los vuelos que existen, a qué aerolínea pertenecen, las características del avión y el lugar de procedencia. Ayuda al aeropuerto a solucionar su problema.
*/
//Generar un esquema -> Definicion de las reglas de una coleccion
const flightsSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    aircraft_name: {
        type: String,
        required: true,
    },
    aircraft_model: Number,
    flight_from: {
        type: String,
        required: true,
    },

})

//Generar un modelo a partir del esquema -> Objeto que nos permite interactuar con la coleccion
const Flights = mongoose.model('Flights', flightsSchema)

api.use(express.urlencoded({ extended: true}))
api.use(express.json({ extended: true}))

//Endpoints
api.get('/', (_, res) => res.status(200).json({message: "it's alive!"}))

//Create
api.post('/api/flights', (req, res) => {
    //1) Recibir la informacion de vuelo que se quiere crear desde el cliente
    const { body } = req
    //2) Pedirle a la base da datos que cree un nuevo documento a partir del body del cliente
    const newFlights = new Flights(body)
    newFlights.save()
    //3) Con la respuesta que recibamos de la base de datos, le respondemos al cliente
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Read All
api.get('/api/flights', (req, res) => {
    Flights.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Read One
api.get('/api/flights/:id', (req, res) => {
    Flights.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Update
api.patch('/api/flights/:id', (req, res) => {
    Flights.findByIdAndUpdate(req.params.id, req.params.id, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Delete
api.delete('/api/flights/:id', (req, res) => {
    Flights.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err))
})

//Encender el servidor
api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))

