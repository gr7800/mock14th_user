const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/User.model")

exports.register = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email: email })
    const hash = await argon2.hash(password)
    try {
        if (user) {
            return res.status(400).send("user already exist")
        } else {
            const newUser = new UserModel({ email, password: hash });
            await newUser.save();
            return res.status(201).send({ meassage: "user created sucessfully", "user": newUser })
        }
    }
    catch (e) {
        return res.status(500).send({ meassage: e.message})
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const user_id = user._id
    if (await argon2.verify(user.password, password)) {
        const token = jwt.sign({ user_id }, "Guddu12345")
        return res.status(201).send({ message: "Login success", token, user: user })
    }

    return res.status(401).send({message:"Invalid credentials"});
}

exports.getProfile = async (req, res) => {
    const { user_id } = req.body
    const user = await UserModel.findOne({ _id: user_id })
    res.send(user);
}