require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


sequelize.sync().then(() => {
    console.log("Database synchronized");
    
    app.listen(PORT, () => {
        console.log(`Seerver is running on port ${PORT}`);
    });
});


