const express = require("express");
const router = express.Router();
const controller = require("../controllers/tatuadoresController");

// define rotas para clientes
router.get("/", controller.get);
router.post("/", controller.post);
router.put("/:id", controller.updateById);
router.delete("/", controller.deleteById);

module.exports = router;