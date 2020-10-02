import {Router} from "express"


export  function clientController(service){
    const client = Router()

    client.get("/clients",async (req,res)=>{
        res.status(200).send(await service.getAll() )
    })

    client.post("/clients", async (req,res)=>{
        const user = req.body

        try {
           await service.add(user)
            res.send("The client has been created")
        } catch (error) { 
            res.status(400).send(e)
        }
        

    })
    client.put("/clients/:id", async(req,res)=>{
        const user = req.body
        const {id} = req.params
        try {
            
            res.send(await service.update(id,user))
        } catch (error) {
            console.log(error)
            res.status(400).send("This user does not exist")
        }
        
    })

    return client
} 

