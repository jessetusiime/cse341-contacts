const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// GET all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET one contact
const getSingleContact = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid contact ID" });
        }
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new contact
const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        res.status(201).json({ id: savedContact._id });
    } catch (err) {
        return res.status(400).json({ message: err.message || "All fields are required." });
    }
}; // Added missing closing bracket here

// PUT - Update a contact
const updateContact = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid contact ID" });
        }

        // Changed variable name to updatedContact to prevent variable shadowing
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found." });
        }

        // Changed to 200 JSON so you actually receive the updated document data
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message || "All fields are required." });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid contact ID" });
        }
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found." });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
