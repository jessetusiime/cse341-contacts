const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Get all contacts'
   #swagger.description = 'Returns all contacts stored in the MongoDB database.'
*/
router.get("/", contactsController.getAllContacts);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Get a contact by ID'
   #swagger.description = 'Returns a single contact using its MongoDB ObjectId.'
*/
router.get("/:id", contactsController.getSingleContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Create a new contact'
   #swagger.description = 'Creates a new contact in the database.'
*/
router.post("/", contactsController.createContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Update a contact'
   #swagger.description = 'Updates an existing contact using its MongoDB ObjectId.'
*/
router.put("/:id", contactsController.updateContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Delete a contact'
   #swagger.description = 'Deletes a contact using its MongoDB ObjectId.'
*/
router.delete("/:id", contactsController.deleteContact);

module.exports = router;