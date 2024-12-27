const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
    res.render("contact", {
        contact: {},
    });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact({
            ...req.body,
            createdBy: req.session.user.email,
        });

        await contact.register(req.session);

        if (contact.errors.length > 0) {
            req.flash("errors", contact.errors);
            req.session.save(() => res.redirect("/contact/index"));
            return;
        }

        req.flash("success", "Contact registered successfully");
        req.session.save(() =>
            res.redirect(`/contact/index/${contact.contact._id}`)
        );
        return;
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render("404");

    const contact = await Contact.getById(req.params.id);

    if (!contact || contact.createdBy !== req.session.user.email) {
        return res.render("404");
    }

    res.render("contact", { contact });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render("404");

        const existingContact = await Contact.getById(req.params.id);
        if (
            !existingContact ||
            existingContact.createdBy !== req.session.user.email
        ) {
            return res.render("404");
        }

        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash("errors", contact.errors);
            req.session.save(() => res.redirect("/contact/index"));
            return;
        }

        req.flash("success", "Contact edited successfully");
        req.session.save(() =>
            res.redirect(`/contact/index/${contact.contact._id}`)
        );
        return;
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render("404");

    const contact = await Contact.getById(req.params.id);

    if (!contact || contact.createdBy !== req.session.user.email) {
        return res.render("404");
    }

    await Contact.delete(req.params.id);

    req.flash("success", "Contact deleted successfully");
    req.session.save(() => res.redirect("/"));
    return;
};
