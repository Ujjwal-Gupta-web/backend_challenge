const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const winston = require("winston");

// API ROUTES
const formRoutes = require("./routes/form.route")
const questionRoutes = require("./routes/question.route")
const answerRoutes = require("./routes/answer.route")
const responseRoutes = require("./routes/response.route")
const toolRoutes = require("./routes/tool.route")

const mailRoutes = require("./tools/mail/mail.route")
const sheetRoutes = require("./tools/sheet/sheet.route")
const askmeRoutes = require("./tools/askme/askme.route")

// DOTENV CONFIG
require('dotenv').config();

// ESSENTIAL MIDDLEWARES
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const DB = process.env.DATABASE;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected.");
}).catch((err) => {
    console.log("Database error");
    console.log(err);
});

// APIS
app.use("/api/form", formRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/response", responseRoutes);
app.use("/api/tool", toolRoutes);

// Tools APIS
app.use("/api/useTool/mail",mailRoutes)
app.use("/api/useTool/sheet",sheetRoutes)
app.use("/api/useTool/askme",askmeRoutes)

app.get('/healthcheck', async (_req, res, _next) => {

    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

app.listen(port, () => {
    console.log("The server is up and running at port 5000");
})

