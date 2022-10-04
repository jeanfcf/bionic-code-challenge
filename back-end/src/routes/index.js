const { Router } = require("express");
const routes = Router();
const controllers = require("../controllers");

const AlarmController = new controllers.AlarmController();

routes.get("/test", (req, res) => {
  res.json({ message: "Application is running." });
});
routes.get("/alarm", AlarmController.show);
routes.post("/alarm", AlarmController.create);
routes.delete("/alarm", AlarmController.removeAll);

module.exports = routes;
