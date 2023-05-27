const multer = require('multer');
const fs = require('fs');
const Cat =require('../models/cat');
//define destination and file name tfor
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname);
    }
  });

//  filter file uploades Accept only image files
exports.fileFilter = function (req, file, cb) {
    
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

//get all cats

exports.getAllCats = (req, res, next) =>{
    Cat.find().then(cats =>{

        res.status(200).json({message:"all cat fetched",cats: cats});
    }).catch(err =>{
        res.status(404).json({message : "no cats found",err: err })
    });
}

//get one cat
exports.getCat = (req,res,next)=>{//
    const catId = req.params.catId;
    Cat.findById(catId).then(cat =>{
        if(!cat){
            return res.status(404).json({message:"cat not found"});
        }else{
            res.status(200).json({message:"cat found",cat: cat});
        }   
    }).catch(err=>{
        res.status(404).json({message:"cat not found", err:err});
    });

}
exports.addCat = (req, res, next)=>{
    const {catName} = req.body;
    const {path} = req.file;
    const {gender} = req.body;
    const {age} =req.body;
    const {ownerName} = req.body;
    const {ownerPhone} = req.body;

    const cat = new Cat({
        catName,
        imageUrl: path,
        gender,
        age,
        ownerName,
        ownerPhone
    });
    cat.save().then(result => {
        res.status(201).json({message:"cat added successfully",cat: result});
    }).catch(err => {
        console.log(err);
        res.status(400).json({message:"error in adding cat",err:err});
    });
}
//update on cat post
exports.updateCat = (req,res,next)=>{
    const {catId} = req.params;
    let path;
    //check if anew image picked
    if(req.file){
        path = req.file.path;
    }else{
        path = req.body.imageUrl;
    }

    Cat.findById(catId).then(cat =>{
        if(!cat){
            return res.status(404).json({message:"cat not found"});
        }
        //delete old image
        if(path !== cat.imageUrl){
            fs.unlink(cat.imageUrl,err=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("old image deleted");
                }
            });
        }
        cat.catName = req.body.catName;
        cat.imageUrl = path;
        cat.gender = req.body.gender;
        cat.age = req.body.age;
        cat.ownerName = req.body.ownerName;
        cat.ownerPhone = req.body.ownerPhone;
        return cat.save();

    }).then(result =>{
        res.status(200).json({message:"cat updated successfully",cat:result});

    }).catch(err =>{
        console.log(err);
        res.status(400).json({message:"error in updating cat",err:err});
    });

}
//Delete cat post

exports.deleteCat = (req, res, next)=>{
    const {catId} = req.params;
    Cat.findById(catId).then(cat =>{
        if(!cat){
            return res.status(404).json({message:"cat not found"});
        }
        fs.unlink(cat.imageUrl, err => console.log(err));
        return Cat.findByIdAndRemove(catId);
    }
    ).then(result=>{
        res.status(200).json({message: "cat deleted successfully"});
    }).catch(err =>{
        res.status(400).json({message: "error in delete cat", err: err})
    });
}