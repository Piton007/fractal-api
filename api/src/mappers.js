export class ClientMapper {
    fromModelToDTO(model){
     return {id:model._id,firstName:model.firstName,lastName:model.lastName,email:model.email,phone:model.phone}
    }
 }