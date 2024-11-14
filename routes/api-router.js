const apiRouter = require("express").Router();
const songRouter = require("./song-routes")
const emailRouter = require("./routes/email-routes");
const userRouter = require("./user-routes")

apiRouter.use("/songs", songRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/email", emailRouter);