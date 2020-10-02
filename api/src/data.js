import { connect,model,Schema } from "mongoose";

const clientSchema = new Schema({
    firstName: String,
    lastName:String,
    email:String,
    phone:String
  });

export const User = model('client',clientSchema)

export class MongooseClientRepository {
    async findAll(){
        return await User.find()
    }
    async getTotal(){
        return await User.countDocuments()
    } 
    async create({firstName,lastName,email,phone}){
        const user = new User({firstName,lastName,email,phone})
        return await user.save()
    }
    async updateById(id,user){
        return await User.findByIdAndUpdate(id,user)
    }
}



export function initDB(uri) {
	connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
		.then(() => {
			console.log("DB Connected");
		})
		.catch((err) => {
			console.log(err);
			os.exit(1);
		});
}


