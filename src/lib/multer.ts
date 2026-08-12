import multer from "multer"

export const imageStorage = multer.memoryStorage()

export const imageFileFilter : multer.Options["fileFilter"] = (req, file, cb) => {
    const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if(allowedMimeTypes.includes(file.mimetype)){
    cb(null, true)
  } else {
    cb(new Error("ONLY JPG, JPEG, PNG, WEBP ARE ALLOWED"))
  }
}

export const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 500*1024
    },
    fileFilter: imageFileFilter
})

export const txtStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/")
  },
  filename: (req, file, callback) => {
    callback(null, String(Date.now() + file.originalname))
  },
})

export const txtUpload = multer({
  storage: txtStorage,
  limits: {
    files: 1,
    fileSize: 30*1024 //30 KB
  },
  fileFilter: (req, file, callback) => {
    if(file.mimetype === "text/plain"){
      callback(null, true)
    } else {
      callback(new Error("Invalid file type, only .txt files allowed"))
    }
  },
  
})


