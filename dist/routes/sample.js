"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sample_1 = require("../controllers/sample");
var sample_2 = require("../validators/sample");
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new sample_1.SampleController();
var validator = new sample_2.SampleValidator();
router.route("/").get(controller.getAll).post(validator.create, controller.create);
router
    .route("/:id")
    .get(controller.get)
    .patch(validator.update, controller.update)
    .delete(controller.delete);
exports.default = router;
