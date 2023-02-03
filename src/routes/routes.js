const express = require("express");
const router = express();
router.use(express.json());
const controller = require("../controllers/companyController");
const {postDetailsValidator} = require("../middleware/companyMiddleware");

router.post("/save",postDetailsValidator,controller.postDetails);


module.exports = router;