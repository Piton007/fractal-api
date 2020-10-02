import {config} from "dotenv"
import express from "express"
import cors from "cors"
import swaggerUi from 'swagger-ui-express'
import {initDB,MongooseClientRepository} from "./data"
import {ClientMapper} from "./mappers" 
import {clientController} from "./presentation"
import {ClientService} from "./services"
const swaggerDocument = require("./swagger.json")
config()

initDB(process.env.CONNECTION_STRING)

const app = express()
app.use(cors({ origin: "*", credentials: true }))
app.use(express.json())


const clientRepository = new MongooseClientRepository()
const clientService = new ClientService(clientRepository, new ClientMapper())
const router = clientController(clientService)
router.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api",router)



app.listen(process.env.PORT || 80,()=>{
    console.log("API running on %s",process.env.PORT)
})



