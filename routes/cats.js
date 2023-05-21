const express = require('express');
const multer = require('multer');
const catsControl = require('../controllers/catsControl');
const storage = require('../controllers/catsControl').storage;
const fileFilter = require('../controllers/catsControl').fileFilter;
const upload = multer({storage: storage, fileFilter: fileFilter});
const router = express.Router();

//Get all cats
router.get('/cats',catsControl.getAllCats);

// GET only one cat
router.get('/cat/:catId',catsControl.getCat);

//POST add new cat
router.post('/cat/add',upload.single('image'),catsControl.addCat);

module.exports = router;