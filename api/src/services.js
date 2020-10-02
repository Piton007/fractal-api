

export class ClientService {
  constructor(repository,mapper){
    this._repository = repository
    this._mapper = mapper
  }
  async getAllWithPaginator(page,limit){
    const pagination = {}
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await this._repository.getTotal()
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    pagination.results = (await this._repository.findAll(startIndex,endIndex)).map(this._mapper.fromModelToDTO)
    return pagination
  }
  async add(user){
      return await this._repository.create(user)
    } 
  async update(id,data){
      return this._mapper(await this._repository.updateById(id,data)) 
    }
}

