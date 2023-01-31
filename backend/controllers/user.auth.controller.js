const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");
const auth = require("../middleware/jwt.auth");

exports.register = async (req, res) => {
  try {
    const { nombres, apellidos, email, password } = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Usuario.create({
      nombres,
      apellidos,
      email: email.toLowerCase(),
      password: encryptedPassword,
      es_administrador: false,
      es_usuario: true,
      esta_activo: true
    });

    const token = auth.createToken(user._id, email);

    res.status(201).send("Se creo la cuenta exitosamente.").json({
      Token: `Bearer ${token}`,
      Role: user.role
    });

    } catch (err) {
      res.status(400).send("Hubo un error inesperado.")
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = auth.createToken(user._id, email);

      user.token = token;

      res.status(200).json({
        Success: true,
        Token: `Bearer ${token}`,
        Role: user.role
      });
    } else {
      res.status(400).send("Las credenciales son invalidas.");
    }
  } catch (err) {
    console.log(err);
  }
};
