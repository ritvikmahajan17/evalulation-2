const express = require("express");
const router = express();
router.use(express.json());
const controller = require("../controllers/companyController");
const {postDetailsValidator} = require("../middleware/companyMiddleware");

router.post("/save",postDetailsValidator,controller.postDetails);
router.get("/companies",controller.getBySector);
router.put("/update/:id",controller.updateCompany);


module.exports = router;