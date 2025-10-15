import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: "doxmb8kai",
    api_key: "333533982964644",
    api_secret: "SYjpaHEdIqmSpU2t6EbDGwg3HEw",
  });

  cloudinary.uploader
    .upload(
      "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
      {
        // resource_type: "video",
        public_id: "my_dog",
        // overwrite: true,
        // notification_url: "https://mysite.example.com/notify_endpoint",
      }
    )
    .then((result) => console.log(result));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
