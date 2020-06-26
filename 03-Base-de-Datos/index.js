//Configuracion
const express = require('express')
const api = express()
const PORT = process.env.PORT || 3000

//Endpoints
api.get('/', (_, res) => res.status(200).json({message: "it's alive!"}))


//Encender el servidor
api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))

