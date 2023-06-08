const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async createUser(req, res) {
    try {
      const pass = req.body.password;

      if (pass.length < 6) {
        return res
          .status(400)
          .json({ msg: "campo de senha deve ter mais de 6 caracteres." });
      }

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        console.log("Esse usario ja existe.");
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);

      const user = {
        email: req.body.email,
        password: encryptedPassword,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
      };

      await User.create(user);
      user.password = undefined;

      return res.status(200).json({ msg: "Usuario criado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao tentar cadastrar usuario: " + error });
    }
  },

  async authentication(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuario nao encontrado." });
      }

      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validatePassword) {
        return res.status(404).json({ msg: "Senha invalida." });
      }

      const secret = process.env.SECRET;

      const userId = user.id

      const token = jwt.sign({ userId: userId }, secret);

      return res.status(200).json({ token, id: userId, msg: "Autenticacao concluida." });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao tentar autenticar usuario: " + error });
    }
  },
};
