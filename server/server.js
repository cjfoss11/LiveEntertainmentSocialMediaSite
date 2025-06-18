const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const port = 8080;


app.use(cors({
    origin: true,
    methods: ["GET", "POST, DELETE"],
    credentials: true
}));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Michael1961!',
  database: 'posts'
});

const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})


const upload = multer({storage:storage})

app.post('/userPosts', upload.single("image"), async (req, res) => {
    const tableName = 'userPosts'; // Replace with your table name

    // Create table query
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${tableName} ( 
            post_id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            description TEXT,
            imageName TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    //FOREIGN KEY (user_id) REFERENCES Users(user_id) - to add later

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating table:", err);
            return res.status(500).send('Error creating table.');
        }

        // Now insert the data
        const insertSQL = `
            INSERT INTO ${tableName} (user_id, description, imageName)
            VALUES (?, ?, ?)
        `;

        const values = [
            req.body.userID,
            req.body.description,
            req.file.filename // assuming multer is saving image to disk
        ];

        connection.query(insertSQL, values, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).send('Error inserting data.');
            }

            res.send({'message': 'Image uploaded and saved to database.'});
        });
    });
})
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// Route to get first 10 entries and potentially handle file uploads
app.get('/userPosts', (req, res) => {
    const tableName = 'userPosts';
    const query = `SELECT * FROM ${tableName} ORDER BY created_at DESC LIMIT 10`;

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }

        if (result) {
            res.send({
                'images': result
            })
        }
        console.log(result)
    });
});


app.delete('/userPosts/:post_id', (req, res) => {
    const postId = req.params.post_id;

    // Step 1: Get the image file name from DB
    const tableName = 'userPosts'
    const query = `SELECT imageName FROM ${tableName} WHERE post_id = ?`;

    connection.query(query, [postId], (err, results) => {
        if (err) {
            console.error("Error fetching image:", err);
            return res.status(500).send('Database error.');
        }

        if (results.length === 0) {
            return res.status(404).send('Post not found.');
        }

        const imageName = results[0].imageName;
        const imagePath = path.join(__dirname, 'uploads/images', imageName);

        fs.unlink(imagePath, (err) => {
            if (err && err.code !== 'ENOENT') {
                console.error("Error deleting file:", err);
                return res.status(500).send('File deletion error.');
            }

            const deletePostQuery = 'DELETE FROM userPosts WHERE post_id = ?';

            connection.query(deletePostQuery, [postId], (err) => {
                if (err) {
                    console.error("Error deleting post:", err);
                    return res.status(500).send('Failed to delete post.');
                }

                res.send({ message: 'Post and image deleted successfully.' });
            });
        });
    });
});




// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});