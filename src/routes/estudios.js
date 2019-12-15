const express = require("express");
const router = express.Router();
const controller = require("../controllers/estudiosController");

// define rotas para clientes
router.get("/", controller.get);
router.get("/:name/agenda/:data", controller.getAgendaByDate);
router.get("/:name/agenda", controller.getAgendaByEstudioName);
router.get("/:name", controller.getByName);
router.post("/", controller.post);
router.post("/:name/agenda/:data", controller.postEventoByDate);
router.post("/:name/agenda", controller.postAgendaByEstudioName);


module.exports = router;