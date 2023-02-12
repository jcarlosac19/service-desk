const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");
const auth = require("../middleware/jwt.auth");

exports.register = async (req, res) => {
  try {
    const { nombres, apellidos, email, password, isAdministrator } = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Usuario.create({
      nombres,
      apellidos,
      email: email.toLowerCase(),
      password: encryptedPassword,
      es_administrador: isAdministrator,
      es_usuario: !isAdministrator,
      esta_activo: true
    });

    const token = auth.createToken(user._id, email);

    res.status(201).send(
      {
        message: "Se creo la cuenta exitosamente.",
        token: `Bearer ${token}`,
        userInfo: {
          email,
          rol: isAdministrator ? 'Administrador' : 'Usuario' ,
          nombres,
          apellidos
        }
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
        message: "Las credenciales han sido validadas.",
        token: `Bearer ${token}`,
        userInfo: {
          nombres: user.nombres,
          apellidos: user.apellidos,
          email: user.email,
          rol: user.es_administrador ? 'Administrador': 'usuario'
        }
      });
    } else {
      res.status(400).send("Las credenciales son invalidas.");
    }
  } catch (err) {
    console.log(err);
  }
};
