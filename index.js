const express = require("express");
const sql = require("mssql");

const app = express();

// SQL config
const dbConfig = {
    user: "sa",
    password: "123",
    server: "DESKTOP-AR2\\SQL2022S",
    database: "P1",
    options: {
        encrypt: true,            // Azure = true
        trustServerCertificate: true // Local = true
    }
};

// Create pool ONCE
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Connected to SQL");
        return pool;
    })
    .catch(err => {
        console.error("DB Connection Failed!", err);
    });

app.post("/procedure", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .execute("GetFirstName");

        const summary = {
            Department: result.recordsets[0],
            Job: result.recordsets[1]
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

app.listen(8085, () => {
    console.log("Server running on port 8085");
});
