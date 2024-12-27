const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
    const contacts = await Contact.getContacts(req.session.user.email);
    res.render("index", { contacts });
    return;
};
