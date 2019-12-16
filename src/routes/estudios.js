const express = require("express");
const router = express.Router();
const controller = require("../controllers/estudiosController");

router.get("/", controller.get);
router.get("/:id/agendas", controller.getAgendasByEstudio);

router.post("/", controller.post);
router.delete("/", controller.deleteById);

router.post("/:id/agendas", controller.postAgendaByEstudio);
router.delete("/:id/agendas", controller.deleteAgendaById);
router.put("/:id/agendas/:agendaId", controller.updateAgendaById);


module.exports = router;