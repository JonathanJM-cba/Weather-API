const { Router } = require("express");
const router = Router();

router.use("/weather", require("./weatherRoute"));

module.exports = router;
