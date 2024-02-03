import { InferSchemaType, Schema, model } from "mongoose";




 const AuthModel = new Schema({

    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAuctioner: {type: Boolean}
    
})



type Auth = InferSchemaType<typeof AuthModel>;

export default model<Auth>("Auth", AuthModel)