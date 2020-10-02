import faker from "faker"
import {config} from "dotenv"
import mongoose from "mongoose"
import {initDB,User as Model} from "./data"
config()
initDB(process.env.CONNECTION_STRING)
console.log("Run Migrations...")
const count = parseInt(process.argv.slice(2),10) 
async function dataSeeding(){
    for (let index = 0; index < count; index++) {
        await new Model(
            {firstName:faker.name.firstName(),lastName:faker.name.lastName(),email:faker.internet.email(),phone:faker.phone.phoneNumber()}).save()
        
    }
}

Promise.all([Model.deleteMany(),dataSeeding()]).then(()=>{
   
    console.log("Migrations finished")
    
}).catch(console.log).finally(()=>{
    mongoose.connection.close()
})



