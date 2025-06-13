require("dotenv").config();
const express = require("express");
const sanitize = require("./middlewares/sanitize");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(sanitize);


app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);


sequelize.sync().then(() => {
    console.log("Database synchronized");
    
    app.listen(PORT, () => {
        console.log(`Seerver is running on port ${PORT}`);
    });
});


