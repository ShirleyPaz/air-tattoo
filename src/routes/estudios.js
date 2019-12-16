const express = require("express");
const router = express.Router();
const controller = require("../controllers/estudiosController");

router.get("/", controller.get);
router.get("/:id/agendas", controller.getAgendasByEstudio);

router.post("/", controller.post);
router.post("/:id/agendas", controller.postAgendaByEstudio);
router.put("/:id/agendas/:agendaId", controller.updateAgendaById);
router.delete("/:id/agendas/:agendaId", controller.deleteAgendaById);

module.exports = router;