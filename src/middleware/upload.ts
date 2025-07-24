import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../utils/s3';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      const fileName = `venues/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

export default upload;
