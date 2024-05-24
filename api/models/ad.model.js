import mongoose from "mongoose";


const adSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true, 
        },

        image:{
            type: String,
            required: true,
        },

        adSlug: {
            type: String,
            required: true,
            unique: true,
        },
    }, {timestamps: true}
);

const Ad = mongoose.model('Ad',adSchema);
export default Ad;