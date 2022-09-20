const multer = require("multer")
const path = require("path")
const imgPath = path.join(__dirname, "../fromUsers/images")

const uploadSignUP = multer({
    storage: multer.diskStorage({
        destination: function (req, file, collBack) {
            collBack(null, imgPath)
        },
        filename: function (req, file, collBack) {
            collBack(null, file.fieldname + "_" + req.body.Userfirstname + "_" + req.body.Userlastname + "_"+req.body.Phone+"_"+req.body.Cnic+"_"+ Date.now() + ".jpg")
        }
    })
})

module.exports = uploadSignUP;