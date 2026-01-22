import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { parseExcel } from "../../utils/excelParser";
import { BULK_UPLOAD_MAP, UploadType } from "../../utils/bulkUploadConfig";
import { isValidEmail, isValidPhone } from "../../utils/validators";

export const bulkUpload = async (req: Request, res: Response) => {
  try {
    const uploadType = req.body.uploadType as UploadType;

    /* ================= BASIC VALIDATIONS ================= */

    if (!uploadType || !BULK_UPLOAD_MAP[uploadType]) {
      return res.status(400).json({ message: "Invalid upload type" });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const config = BULK_UPLOAD_MAP[uploadType];
    const rows = parseExcel(req.file.buffer);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    /* ================= PROCESS ROWS ================= */

    const documents: any[] = [];
    const skippedRows: any[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      /* ---------- REQUIRED FIELD CHECK ---------- */
      const missing = config.requiredFields.filter(
        (field) =>
          row[field] === undefined ||
          row[field] === null ||
          row[field] === ""
      );

      if (missing.length > 0) {
        skippedRows.push({
          rowNumber: i + 1,
          reason: `Missing fields: ${missing.join(", ")}`,
          data: row,
        });
        continue;
      }

      /* ---------- EMAIL VALIDATION ---------- */
      if (row.email && !isValidEmail(String(row.email))) {
        skippedRows.push({
          rowNumber: i + 1,
          reason: "Invalid email format",
          data: row,
        });
        continue;
      }

      /* ---------- PHONE VALIDATION ---------- */
      if (row.phone && !isValidPhone(String(row.phone))) {
        skippedRows.push({
          rowNumber: i + 1,
          reason: "Invalid phone number",
          data: row,
        });
        continue;
      }

      /* ================= TRANSFORMATIONS ================= */

      /* ===== AUDITORIUM USER ===== */
      if (uploadType === "AUDITORIUM_USER") {
        if (
          !row.password ||
          typeof row.password !== "string" ||
          row.password.trim().length < 6
        ) {
          skippedRows.push({
            rowNumber: i + 1,
            reason: "Invalid or missing password",
            data: row,
          });
          continue;
        }

        row.password = await bcrypt.hash(row.password, 10);
        row.role = "auditorium";
        row.isVerified = true;
        row.isBlocked = false;

        // REQUIRED DEFAULTS FOR SCHEMA
        row.locations = [];

        row.events =
          typeof row.events === "string"
            ? row.events.split(",").map((e: string) => e.trim())
            : [];
      }

      /* ===== VENDOR ===== */
      if (uploadType === "VENDOR") {
        row.cities =
          typeof row.cities === "string"
            ? row.cities.split(",").map((c: string) => c.trim())
            : [];

        row.images =
          typeof row.images === "string"
            ? row.images.split(",").map((i: string) => i.trim())
            : [];
      }

      /* ===== BOOKING ===== */
      if (uploadType === "AUDITORIUM_BOOKING") {
        row.status = row.status || "pending";
      }

      documents.push(row);
    }

    /* ================= INSERT INTO DB ================= */

    let insertedDocs: any[] = [];

    try {
      insertedDocs = await (config.model as any).insertMany(documents, {
        ordered: false,
      });
    } catch (err: any) {
      console.error("🔥 INSERT MANY ERROR:", err);

      if (err?.writeErrors) {
        err.writeErrors.forEach((e: any, idx: number) => {
          console.error(`❌ WriteError ${idx + 1}:`, e.errmsg);
        });
      }

      if (err?.insertedDocs) {
        insertedDocs = err.insertedDocs;
      }
    }

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      uploadType,
      totalRows: rows.length,
      successCount: insertedDocs.length,
      skippedCount: skippedRows.length,
      skippedRows,
    });
  } catch (error: any) {
    console.error("❌ BULK UPLOAD FAILED:", error);

    return res.status(500).json({
      message: "Bulk upload failed",
      error: error.message,
    });
  }
};
