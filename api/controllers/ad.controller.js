import { v4 as uuidv4 } from 'uuid';
import Ad from '../models/ad.model.js';



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