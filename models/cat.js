const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const catSchema = new Schema({
    catName: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    ownerPhone:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('Cat', catSchema);