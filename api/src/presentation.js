import {Router} from "express"


export  function clientController(service){
    const client = Router()

    client.get("/clients",async (req,res)=>{
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        res.status(200).send(await service.getAllWithPaginator(page,limit) )
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
        const {user} = req.body
        const {id} = req.params
        try {
            await service.update(id,user)
            res.send("The client has been updated")
        } catch (error) {
            res.status(400).send("This user does not exist")
        }
        
    })

    return client
} 

