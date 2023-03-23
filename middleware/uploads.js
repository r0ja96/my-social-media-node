const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderPath = `uploads`;

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        folderPath = path.join(folderPath, req._id);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        file.name = `${Date.now()}.${file.mimetype.split('/')[1]}`

        cb(null, file.name);
    }
});

const upload = multer({ storage: storage });


module.exports = upload.single("image");