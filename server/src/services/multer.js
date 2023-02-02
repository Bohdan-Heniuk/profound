import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatars/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' - ' + file.originalname)
    }
  })

export const uploadWithoutSaving = multer();


export const uploadWithSaving = multer({ storage });

