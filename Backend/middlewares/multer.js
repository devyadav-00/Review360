import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, "./public/temp")
    },
    filename: function (req, file, callBack) {
        const uniqueSuffix = Date.now();
        callBack(null, file.originalname + "-" + uniqueSuffix)
    }
})

const upload = multer({ storage })
export {
    upload
}