const express = require("express");
const router = express.Router();
const controller = require("../controllers/estilosController");

// define rotas para clientes
router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;