//node native libraries
const { readdirSync } = require("fs");
const http = require("http");
//eternal libraries

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { isAuthenticated } = require("./middlewares/isAuthenticated");

require("dotenv").config();


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const main = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log("DB connected");

    const app = express();
    const server = http.createServer(app);
    
   
    app.use(
      morgan(
        "dev",
        ":method :url :status :res[content-length] - :response-time ms - [:date[clf]]"
      )
    );

    app.use(
        cors({
          credentials: true,
          origin:
            process.env.NODE_ENV === "production"
              ? process.env.BACKOFFICE_API_PROD
              : process.env.BACKOFFICE_API,
        })
      );
    
    //use cookieparser
    app.use(cookieParser());
    app.use(express.json({ limit: "150mb" }));
    app.use(express.urlencoded({ extended: true, limit: "150mb" }));

    readdirSync("./routes/public").map((r) =>
      app.use("/api", require(`./routes/public/${r}`))
    );
    readdirSync("./routes/secure").map((r) =>
      app.use("/api", isAuthenticated, require(`./routes/secure/${r}`))
    );


    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({ error: err });
    });

    app.get('/', (req, res) => {
        res.send('Hello World!');
      });
    server.listen(PORT, () => {
      console.log("Server has started! on http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("DB connection error: ", error);
  }
};
main();