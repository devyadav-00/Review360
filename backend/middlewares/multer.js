import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, "./public/temp")
    },
    filename: function (req, file, callBack) {
        const uniqueSuffix = Date.now();
        const extension = path.extname(file.originalname);
        callBack(null, file.originalname + "-" + uniqueSuffix + extension);
    }
})

const upload = multer({ storage })
export {
    upload
}