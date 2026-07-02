const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const connectDB = require("../mongodb");

router.get("/", async (req, res) => {
    try {

        const db = await connectDB();

        const contacts = await db
            .collection("contacts")
            .find()
            .toArray();

        res.json(contacts);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {

        const db = await connectDB();

        const contactId = new ObjectId(req.params.id);

        const contact = await db
            .collection("contacts")
            .findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.json(contact);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

module.exports = router;