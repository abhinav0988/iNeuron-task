let UserModel = require("../model/userModel")
let jwt = require("jsonwebtoken")

let userCreate = async function (req, res) {
    try {
        let data = req.body
        let { firstName, lastName, email, password } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "please enetr some data in body" })
        }
        if (!firstName) {
            return res.status(400).send({ status: false, msg: "please enetr firstName " })

        }
        if (!lastName) {
            return res.status(400).send({ status: false, msg: "please enetr lastName" })

        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "please enetr email " })

        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "please enetr password " })

        }
        let userdata = await UserModel.create(data)
        res.status(201).send({ status: true, data: userdata, msg: "user detail create successfully" })
    } catch (error) {
         res.status(500).send({ status: false, msg: error })
    }
}

let userLogin = async function (req, res) {
    let email = req.body.email
    let password = req.body.password
    if (!email) {
        return res.status(400).send({ status: false, msg: "please enetr email " })

    }
    if (!password) {
        return res.status(400).send({ status: false, msg: "please enetr password " })

    }
    let user = await UserModel.findOne({ email: email, password: password })
    if (!user) {
        return res.status(404).send({ status: false, msg: "user not found" })
    }

    let token = jwt.sign({
        userid: user._id.toString(),
        company: "iNeuron"
    }, "iNeuron", { expiresIn: "12h" })
    res.status(200).send({ status: true, data: token })
}
module.exports.userCreate = userCreate
module.exports.userLogin = userLogin
