import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

export const config = {
    api: {
        bodyParser: false, // Required for formidable
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // ✅ Change the upload directory to `/tmp/`
    const uploadDir = path.join("/tmp", "order");

    function ensureDirectoryExistence(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    ensureDirectoryExistence(uploadDir);

    const form = new IncomingForm({ 
        uploadDir, 
        keepExtensions: true 
    });

    try {
        await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    res.status(500).json({ message: "File upload failed" });
                    return reject(err);
                }

                const file = files.file;
                const filePath = path.join(uploadDir, file.newFilename);
                const fileUrl = `/tmp/${file.newFilename}`; // Change to `/tmp/` for proper access

                fs.renameSync(file.filepath, filePath);

                setTimeout(() => {
                    fs.unlinkSync(filePath); // Delete after 5 seconds (optional)
                }, 3600000);

                res.status(200).json({ message: "PDF stored", fileUrl });
                resolve();
            });
        });
    } catch (error) {
        res.status(500).json({ message: "File move failed", error });
    }
}