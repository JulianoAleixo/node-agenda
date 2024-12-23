import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "./modules/Login";
import Contact from "./modules/Contact";
import ChangeTheme from "./modules/ChangeTheme";

const register = new Login(".form-register");
const login = new Login(".form-login");
const contact = new Contact(".form-contact");
const switchTheme = new ChangeTheme(".change-theme-input");

register.init();
login.init();
contact.init();
switchTheme.init();

import './assets/css/style.css'; 
