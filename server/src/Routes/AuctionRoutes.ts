import { Router } from "express";
import {createAuctionList, getAuctionList } from "../Controllers/AuctionListing";


export const router = Router();


router.get("/home", getAuctionList);

router.post("/home/createAuction", createAuctionList)