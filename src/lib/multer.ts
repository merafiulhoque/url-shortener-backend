import multer from "multer"

export const storage = multer.memoryStorage()

export const fileFilter : multer.Options["fileFilter"] = (req, file, cb) => {
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

export const upload = multer({
    storage,
    limits: {
        fileSize: 500*1024
    },
    fileFilter
})

