const router = require("express").Router();

const { login, getAccessToken, logout } = require("../../controllers/auth");
const BASE_PATH = "/auth";

router.post(`${BASE_PATH}/login`, login);
router.get(`${BASE_PATH}/refreshToken`, getAccessToken);
router.get(`${BASE_PATH}/logout`, logout);

module.exports = router;
