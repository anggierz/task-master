require("dotenv").config();
const express = require("express");
const sanitize = require("./middlewares/sanitize");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const sequelize = require("./models/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(sanitize);


app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


sequelize.sync().then(() => {
    console.log("Database synchronized");
    
    app.listen(PORT, () => {
        console.log(`Seerver is running on port ${PORT}`);
    });
});


