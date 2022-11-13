import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        refs: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        inStock: {type: Number, required: true},
        rating: {type: Number, required: true},
        reviewsNum: {type: Number, required: true},
        details: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Prod = mongoose.model('Prod', prodSchema);

export default Prod;