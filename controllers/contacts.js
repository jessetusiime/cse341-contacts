const { ObjectId } = require("mongodb");
const connectDB = require("../mongodb");

// GET all contacts
const getAllContacts = async (req, res) => {
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
};

// GET one contact
const getSingleContact = async (req, res) => {
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
};

// Create a new contact
const createContact = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const db = await connectDB();

        const result = await db.collection("contacts").insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        res.status(201).json({
            id: result.insertedId
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// PUT - Update a contact
const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        // Validate required fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const db = await connectDB();

        const result = await db.collection("contacts").updateOne(
            { _id: contactId },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    favoriteColor,
                    birthday
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.sendStatus(204);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const db = await connectDB();

        const result = await db.collection("contacts").deleteOne({
            _id: contactId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.sendStatus(204);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};