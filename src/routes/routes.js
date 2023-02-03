const express = require("express");
const router = express();
router.use(express.json());
const controller = require("../controllers/companyController");

router.post("/save",controller.postDetails);


module.exports = router;