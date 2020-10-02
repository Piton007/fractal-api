

export class ClientService {
  constructor(repository,mapper){
    this._repository = repository
    this._mapper = mapper
  }
  async getAll(){
    return  (await this._repository.findAll()).map(this._mapper.fromModelToDTO)
    
  }
  async add(user){
      return await this._repository.create(user)
    } 
  async update(id,data){
      return this._mapper.fromModelToDTO(await this._repository.updateById(id,data)) 
    }
}

