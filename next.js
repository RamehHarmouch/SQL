const sql = require("msnodesqlv8");
const connectionstring = "server=DESKTOP-AR2\\SQL2022S;Database=P1;Trusted_connection=Yes;Driver={ODBC Driver 17 for SQL Server}"
const query = "SELECT FirstName FROM Persons";

sql.query(connectionstring, query, (err, rows) => {
    if (err) {
        console.error("SQL Query Error: ", err);
        return;
    }
    console.log("Query Result: ", rows);
})