"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
console.log("dsf");
router.post("/login", auth_1.AuthControllers.loginUser);
// router.post(
//   "/login",
//   UserController.createStudent
// );
exports.AuthRoutes = router;
