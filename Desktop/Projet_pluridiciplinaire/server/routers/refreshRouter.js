const router = require("express").Router();
const { refresh } = require("../controllers/refreshController");
// the client side handle the expiring of the access token and genrates a new one by requesting /refresh
//its idea is general , later it needs to be specified for the roles : when roles_token expires 
router.get("/", refresh);
module.exports = router;
