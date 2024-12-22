require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
    .connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit("Connected to MongoDB");
    })
    .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require("helmet")
const csrf = require("csurf");
const { globalMiddleware, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middleware");

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
    secret: "8TlwvJvjtop1ndA429XElu6FQ",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milisseconds
        httpOnly: true,
    },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("Connected to MongoDB", () => {
    app.listen(3000, () => {
        console.log("Server runing on port 3000...");
        console.log("Access on http://localhost:3000");
    });
});
