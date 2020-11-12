require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const activityTaskRouter = require("./routes/ActivityTask.routes");
const authRouter = require("./routes/auth.routes");

require("./configs/db.config");

require("./configs/passport.config")(app);

app.use("/api", activityTaskRouter);
app.use("/api", authRouter);

app.listen(process.env.PORT, () => console.log("running at port 1234"));
