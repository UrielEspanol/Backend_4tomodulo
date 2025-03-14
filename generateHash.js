const bcrypt = require("bcryptjs");

const password = "uriel";  

bcrypt.hash(password, 10).then((hash) => {
    console.log("Nuevo hash generado:", hash);
});
