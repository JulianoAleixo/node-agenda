import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "./modules/Login";
import Contact from "./modules/Contact";

const register = new Login(".form-register");
const login = new Login(".form-login");
const contact = new Contact(".form-contact");

register.init();
login.init();
contact.init();

import './assets/css/style.css'; 
