const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT, { expiresIn: "1h" });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash della password prima di salvarla nel database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id);

    res.status(201).json({ message: "Utente registrato con successo", token: token });
  } catch (error) {
    res.status(500).json({ error: "Impossibile completare la registrazione" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trova l'utente nel database per l'email fornita
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id);

      res.json({ token, message: "Accesso effettuato con successo" });
    } else {
      res.status(401).json({ error: "Credenziali non valide" });
    }
  } catch (error) {
    res.status(500).json({ error: "Impossibile effettuare l'accesso" });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { id, title, imgae } = req.recipes.body;

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utente registrato con successo" });
  } catch (error) {
    res.status(500).json({ error: "Impossibile completare la registrazione" });
  }
};
