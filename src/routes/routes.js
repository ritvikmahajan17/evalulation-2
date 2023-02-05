const express = require("express");
const router = express();
router.use(express.json());
const controller = require("../controllers/companyController");
const {postDetailsValidator,getBySectorValidator, updateByIdValidator} = require("../middleware/companyMiddleware");

router.post("/save",postDetailsValidator,controller.postDetails);
router.get("/companies",getBySectorValidator,controller.getBySector);
router.put("/update/:id",updateByIdValidator,controller.updateCompany);


module.exports = router;