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

    const uploadDir = path.join(process.cwd(), "public/order");

    // **Function to Ensure Directory Exists**
    function ensureDirectoryExistence(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Create folder if it doesn’t exist
        }
    }

    ensureDirectoryExistence(uploadDir); // ✅ Ensure "public/order" folder exists

    const form = new IncomingForm({ 
        uploadDir, 
        keepExtensions: true 
    });

    await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return res.status(500).json({ message: "File upload failed" });
            }

            const file = files.file[0]; // Properly access the uploaded file
            const filePath = path.join(uploadDir, file.newFilename);
            const fileUrl = `/order/${file.newFilename}`;

            try {
                // Move file to correct path
                fs.renameSync(file.filepath, filePath);
                setTimeout(()=>{
                    // fs.unlinkSync(filePath);
                }, 5000)
                res.status(200).json({ message: "PDF stored", fileUrl });
                resolve();
            } catch (error) {
                reject(error);
                return res.status(500).json({ message: "File move failed", error });
            }
        });
    });
}
