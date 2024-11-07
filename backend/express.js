const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sriram@098",
    database: "onlinedatabasedbms"
});


db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");
});

app.post("/signup", (req, res) => {
    const sql = "INSERT INTO usersdata (name, password) VALUES (?, ?)";
    const values = [req.body.username, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database insertion error" });
        } else {
            res.status(200).json({ message: "User registered successfully", data });
        }
    });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM usersdata WHERE name = ? AND password = ?";
  
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error_msg: "Database error" });
        }
  
        if (results.length > 0) {
            // Here, you would typically generate a JWT token and send it back
            const token = "your_generated_token"; // Replace with actual token generation logic
            return res.status(200).json({ jwt_token: token });
        } else {
            return res.status(401).json({ error_msg: "Invalid username or password" });
        }
    });
});
app.listen(8082, () => {
    console.log("Server is running hello ");
});
