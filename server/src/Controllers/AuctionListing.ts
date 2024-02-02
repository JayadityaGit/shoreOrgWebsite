import { RequestHandler } from "express"

import AuctionModel from "../Model/dbModel"
import createHttpError from "http-errors";

export const getAuctionList: RequestHandler =  async(req, res, next)=>{
      

    try {
        
        const AuctionList = await AuctionModel.find().exec();

        if(!AuctionList){
            throw createHttpError(500, "the server does not seem to fetch the auction list")
        }

        res.status(200).json(AuctionList);
        
    } catch (error) {
        
         next(error)

    }


}


interface auctionData{
    farmerName: string,
    farmerCertificate: string,
    images: string[],
    products: string[],
    MinAmount: number,
    isAuction: boolean,
    password: string,
}



export const createAuctionList: RequestHandler =  async(req, res, next)=>{
      

    try {

        const auctionData: auctionData = req.body.auctionDetails;

        if(!auctionData){
            throw createHttpError(400, "server needs auction data to create an auction")
        }

        if(!auctionData.farmerName){
            throw createHttpError(400, "server needs farmer data to create an auction")
        }

        if(!auctionData.farmerCertificate){
            throw createHttpError(400, "server needs farmer certificate to create an auction")
        }


        if(!auctionData.images){
            throw createHttpError(400, "server needs image data to create an auction")
        }

        if(!auctionData.products){
            throw createHttpError(400, "server needs products data to create an auction")
        }

        if(!auctionData.MinAmount){
            throw createHttpError(400, "server needs minimumAmount to create auction")
        }

        if(!auctionData.isAuction){
            throw createHttpError(400, "include true for starting auction, include false for cancelling auction")
        }
        
        if(!auctionData.password){
            throw createHttpError(400, "server needs to password to recognize the head in order to delete or update the auction details")
        }
        
        const AuctionList = await AuctionModel.create({
            farmerName: auctionData.farmerName,
            farmerCertificate: auctionData.farmerCertificate,
            images: auctionData.images,
            products: auctionData.products,
            MinAmount: auctionData.MinAmount,
            isAuction: auctionData.isAuction,
            password: auctionData.password,

        });

        if(!AuctionList){
            throw createHttpError(500, "the server does not seem to able to create the auction list")
        }

        res.status(200).json(AuctionList);
        
    } catch (error) {
        
         next(error)

    }


}




export const DeleteAuction: RequestHandler =  async(req, res, next)=>{
      

    try {
        
         const auctionId = req.body.deleteId;

         const password = req.body.password;

         if(!password){
            throw createHttpError(400, "we need password to delete the auction")
         }

         if(!auctionId){
            throw createHttpError(500, "the server not able to fetch the auctionId")
         }


        const auction = await AuctionModel.findById(auctionId);

        if(!auction){
            throw createHttpError(500, "auction may not exist")
        }

        if(auction.password !== password){
              throw createHttpError(400, "the given password is invalid !")
        }
         


         await AuctionModel.findByIdAndDelete();

        
        
    } catch (error) {
        
         next(error)

    }


}