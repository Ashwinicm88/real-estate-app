// require("dotenv").config();
// const express = require("express");
// const multer = require("multer");
// const { Pool } = require("pg");
// const cors = require("cors");
// const sharp= require("sharp");// for image compression
 
// const app = express();
 
 
// const path = require("path");




// // ✅ Add CORS Middleware **Before Routes**
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Frontend URL
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type",
//   })
// );
// app.use("/uploads", express.static("uploads"));

// // PostgreSQL Database Connection
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//   });
 
 
// // Configure Multer to store images in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
 
// // API Endpoint to Upload Multiple Images with units
// app.post("/multiple-upload",upload.array("files", 5), async (req, res) => {
//   try {
 
//     const {units} = req.body;
//     // Validate units (must be a positive integer)
//     if (!Number.isInteger(Number(units)) || units <= 0) {
//         return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//       }
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }
 
//     const insertQuery = `
//       INSERT INTO multipleimages (filename, image, mimetype,units)
//       VALUES ($1, $2, $3, $4) RETURNING *;
//     `;
 
//     const uploadedFiles = [];
 
//     for (const file of req.files) {
//       const { originalname, mimetype, buffer } = file;
//        // Compress image using sharp (reduce quality to 70%)
//        const compressedImage = await sharp(buffer)
//        .resize(800) // Resize width to 800px (adjustable)
//        .jpeg({ quality: 70 }) // Convert to JPEG & reduce quality
//        .toBuffer();
//       const result = await pool.query(insertQuery, [originalname, compressedImage, mimetype,units]);
//       uploadedFiles.push(result.rows[0]);
//     }
 
//     res.json({ success: true, data: uploadedFiles });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
 
// // API Endpoint to Fetch All Image URLs
// app.get("/all-images", async (req, res) => {
//     try {
//       const query = "SELECT * FROM multipleimages";
//       const result = await pool.query(query);
 
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "No images found" });
//       }
 
//       const images = result.rows.map((row) => ({
//         id: row.id,
//         filename: row.filename,
//         units: row.units,
//         url: `http://localhost:5000/multipleimages/${row.id}`,
//       }));
 
//       res.json({ success: true, data: images });
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
 
//   // API Endpoint to Fetch Single Image
//   app.get("/multipleimages/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
 
//       const query = "SELECT * FROM multipleimages WHERE id = $1";
//       const result = await pool.query(query, [id]);
 
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "Image not found" });
//       }
 
//       const { filename, image, mimetype, units } = result.rows[0];
//       res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
//       res.setHeader("Content-Type", mimetype);
//       res.setHeader("units", units);// Optional: Send units as a response header
//       res.send(image);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "uploads/"); // Save images in the "uploads" folder
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/upload", upload.array("images", 10), async (req, res) => {
//   try {
//       const { project_id, wing_id } = req.body;
//       const filenames = req.files.map((file) => file.filename); // Store multiple images
//       const mimetypes = req.files.map((file) => file.mimetype); // Store mimetypes

//       // Ensure filenames and mimetypes arrays are not empty
//       if (!filenames.length || !mimetypes.length) {
//           return res.status(400).json({ error: "No files uploaded" });
//       }

//       // Insert into database
//       const query = `
//           INSERT INTO image_fileses (project_id, wing_id, filename, mimetype) 
//           VALUES ($1, $2, $3, $4) RETURNING *;
//       `;

//       // Insert each image separately
//       const insertedImages = [];
//       for (let i = 0; i < filenames.length; i++) {
//           const values = [project_id, wing_id, filenames[i], mimetypes[i]];
//           const result = await pool.query(query, values);
//           insertedImages.push(result.rows[0]);
//       }

//       res.status(201).json(insertedImages);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Error uploading images" });
//   }
// });

// app.get("/all-images", async (req, res) => {
//   try {
//     const query = `
//       SELECT mi.id, mi.units, 
//              COALESCE(json_agg(if.filename) FILTER (WHERE if.filename IS NOT NULL), '[]') AS urls
//       FROM multipleimages mi
//       LEFT JOIN image_fileses if ON mi.id = if.project_id
//       GROUP BY mi.id, mi.units
//     `;

//     const result = await pool.query(query);
//     res.json({ success: true, data: result.rows });
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


//  // API Endpoint to Fetch Images by Units
// app.get("/images-by-units/:units", async (req, res) => {
//     try {
//       const { units } = req.params;
 
//       if (!Number.isInteger(Number(units)) || units <= 0) {
//         return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//       }
 
//       const query = "SELECT * FROM multipleimages WHERE units = $1";
//       const result = await pool.query(query, [units]);
 
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "No images found for this unit count" });
//       }
 
  
//       if (!Number.isInteger(Number(units)) || units <= 0) {
//         return res.status(400).json({ error: "Invalid units. It must be a positive integer." });
//       }
  
//       const query = "SELECT * FROM multipleimages WHERE units = $1";
//       const result = await pool.query(query, [units]);
  
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "No images found for this unit count" });
//       }
  
//       res.json({ success: true, data: result.rows });
//     } catch (error) {
//       console.error("Error fetching images by units:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
 
// // Start Server
// app.listen(5000, () => console.log("Server running on port 5000"));
 
//   app.get("/multipleimages/:unit_id", async (req, res) => {
//     try {
//         const { unit_id } = req.params;

//         // Fetch the image array from PostgreSQL
//         const query = "SELECT mulimage FROM multipleimages WHERE units = $1";
//         const result = await pool.query(query, [unit_id]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "No images found for this unit" });
//         }

//         // Convert the PostgreSQL array format {uploads/image1.jpg,uploads/image2.jpg} to a JavaScript array
//         const imagePaths = result.rows[0].mulimage;
        
//         // Convert file paths to full URLs
//         const imageUrls = imagePaths.map(img => `http://localhost:5000/${img}`);

//         res.json({ success: true, images: imageUrls });
//     } catch (error) {
//         console.error("Error fetching images:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
// app.get("/multipleimages/:id", async (req, res) => {
//   try {
//       const { id } = req.params;

//       // Fetch images from the database
//       const query = "SELECT filename FROM multipleimages WHERE id = $1";
//       const result = await pool.query(query, [id]);

//       if (result.rows.length === 0) {
//           return res.status(404).json({ error: "Image not found" });
//       }

//       // Generate image URLs without extra quotes
//       const images = result.rows.map(row => `http://localhost:5000/uploads/${row.filename}`);

//       res.json({ success: true, images });
//   } catch (error) {
//       console.error("Error fetching images:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.get("/uploads/:filename", async (req, res) => {
//   try {
//       const { filename } = req.params;
//       const imagePath = `uploads/${filename}`; // Adjust this based on your storage

//       // Set proper headers for image display
//       res.setHeader("Content-Type", "image/jpeg"); // Adjust MIME type if needed
//       res.sendFile(imagePath, { root: "." }); // Serve image file from your local folder
//   } catch (error) {
//       console.error("Error fetching image:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

  
// // Start Server
// app.listen(5000, () => console.log("Server running on port 5000"));
