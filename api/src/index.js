import {config} from "dotenv"
import express from "express"
import cors from "cors"
import {initDB,MongooseClientRepository} from "./data"
import {ClientMapper} from "./mappers" 
import {clientController} from "./presentation"
import {ClientService} from "./services"
config()

initDB(process.env.CONNECTION_STRING)

const app = express()
app.use(cors({ origin: "*", credentials: true }))
app.use(express.json())


const clientRepository = new MongooseClientRepository()
const clientService = new ClientService(clientRepository, new ClientMapper())
const controller = clientController(clientService)
app.use(controller)



app.listen(process.env.PORT || 80,()=>{
    console.log("API running on %s",process.env.PORT)
})



