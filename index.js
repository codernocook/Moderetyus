// All model explained in "README.md", this file is for demo, and test.
const normal_model          = require("./models/general_model.js");         // For daily chat
const normal_strict_model   = require("./models/normal_strict_model.js");   // A bit strict, recommend for the user in the range of 13 - 17 years old
const strict_model          = require("./models/strict_model.js");          //Strict, recommend for the user < 13 years old

const vaild = normal_model.moderateText("Hello world!, Replace this text with message")

console.log(vaild)