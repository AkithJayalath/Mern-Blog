import { v4 as uuidv4 } from 'uuid';
import Ad from '../models/ad.model.js';
import { query } from 'express';



const createSlugFromUuid = (uuid) => {
    return uuid.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

const createAdSlug = () => {
   
    const uniqueIdentifier = uuidv4();

    
    const slug = createSlugFromUuid(uniqueIdentifier);

    return slug;
};


export const createad = async (req, res, next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, "You are not allowed to create a post"))
    }
    if(!req.body){
        return next(errorHandler(400,'Please upload the ad'))
    }

    const adSlug = createAdSlug();

    const newAd = new Ad({
        ...req.body, 
        adSlug,
        userId: req.user.id,
    });

    try{
        const savedAd = await newAd.save();
        res.status(201).json(savedAd);

    }catch(error){
        next(error);
    }

};

export const getads = async (req, res, next) => {
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const ads = await Ad.find({
            ...(req.query.userId && { userId: req.query.userId}),
            ...(req.query.adSlug && { adSlug: req.query.adSlug}),
            ...(req.query.image && { image: req.query.image}),
            ...(req.query.adId && { _id: req.query.adId}),
    }).sort({ updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalAds= await Ad.countDocuments();

        const now= new Date();

        const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()

    );

    const lastMonthAds = await Ad.countDocuments({
        createdAt: {$gte: oneMonthAgo},
    });

    res.status(200).json({
        ads,
        totalAds,
        lastMonthAds,
    });
    }catch (error){
        next(error);
    }
};


export const deletead = async (req,res,next) =>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this ad'));
    }

    try{
        await Ad.findByIdAndDelete(req.params.adId);
        res.status(200).json('The post has been deleted');

    }catch (error){
        next(error);
    }
};

export const updatead = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this ad'));
      }
      try {
        const adSlug = req.body.adSlug || createAdSlug();

        const updatedAd = await Ad.findByIdAndUpdate(
            req.params.adId,
            { $set: { ...req.body, adSlug } },
            { new: true }
        );
        res.status(200).json(updatedAd);
      } catch (error) {
        next(error);
      }
};