const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../static/image'))
    },
    filename: function (req, file, cb){
       const ext = file.originalname.split('/').pop()
       console.log(ext);
       const exte = ext.toUpperCase();
       console.log(exte);
       cb(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})
module.exports = storage