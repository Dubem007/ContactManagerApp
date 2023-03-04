const express = require("express");
const { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact } = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// router.route("/").get((req, res)=>{
//     res.status(200).json({message:"These are the contacts"});
// });

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;