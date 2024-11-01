const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> {
    res.json({message: "Welcome to contact book application."});
})

const contactsRouter = require("./app/routes/contact.route");

app.use("/api/contacts", contactsRouter);

const ApiError = require("./app/api-error");

//handle 404 response
app.use((req, res, next)=> {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json ({message: error.message || "Internal Server Error"})
})

module.exports = app;