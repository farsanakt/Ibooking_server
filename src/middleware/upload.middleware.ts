import multer from "multer";

const storage = multer.memoryStorage();

export const uploadExcel = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype.includes("spreadsheet") ||
      file.mimetype.includes("csv")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel or CSV files allowed"));
    }
  },
});
