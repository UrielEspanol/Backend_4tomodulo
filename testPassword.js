const bcrypt = require("bcryptjs");

const storedHash = "$2b$10$zNq9kJc9aN0KJj0aB3x9XeB.q/uJxLprV6vG6p3Hq01RpmQfOrq5K"; // Hash de la contraseña en la base de datos
const password = "uriel"; // La contraseña que intentas usar para iniciar sesión

bcrypt.compare(password, storedHash).then((result) => {
    if (result) {
        console.log("✅ La contraseña es correcta.");
    } else {
        console.log("❌ La contraseña es incorrecta.");
    }
});
