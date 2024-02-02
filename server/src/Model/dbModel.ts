import { InferSchemaType, Schema, model } from "mongoose";




 const AuctionModel = new Schema({

    farmerName: {type: String, required: true},
    farmerCertificate: {type: String, required: true},
    images: [{type: String , required: true}],
    products: [{type: String, required: true}],
    MinAmount: {type: Number, required: true},
    isAuction: {type: Boolean, required: true},
    password: {type: String, required: true}
    
}, {timestamps: true})



type Auction = InferSchemaType<typeof AuctionModel>;

export default model<Auction>("Auction", AuctionModel)