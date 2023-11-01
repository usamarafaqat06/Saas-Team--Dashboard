const User = require("../model/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    if (!req.body.userName || !req.body.role || !req.body.password) {
        return res.status(400).json({ message: "Something is missing.", status: false })
    }
    try {
        const userExists = await User.findOne({ userName: req.body.userName });
        if (userExists !== null) {
            return res.status(409).json({ message: "User Already Exists", status: false })
        }
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({
            userName: req.body.userName,
            password: hashedPassword,
            role: req.body.role,
            created_by: req.user._id
        });
        await newUser.save()
        res.status(200).json({ message: "User Successfully created", status: true });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Unsuccessful in creating a user.", status: false, err })
    }
}

const loginUser = async (req, res) => {
    if (!req.body.userName || !req.body.password) {
        return res.status(400).json({ message: "Something is missing.", status: false })
    }
    try {
        const user = await User.findOne({
            userName: req.body.userName,
        })
        if (!user) {
            return res.status(404).json({ message: "Username or Password Incorrect..", status: false });
        }
        const passwordChecker = await bcrypt.compare(req.body.password, user.password)
        if (!passwordChecker) {
            return res.status(404).json({ message: "Username or Password Incorrect..", status: false });
        }
        if (user && passwordChecker) {
            const token = jwt.sign({
                userName: user.userName,
                _id: user._id
            }, 'secret_is_a_secret_for_user', {
                expiresIn: '1d'
            })
            res.set('Authorization', `Bearer ${token}`).status(200).json({ user, token, type: "user", message: "User successfully Logged In.", status: true })
        }
        else {
            res.status(300).json({ message: "Password or user not correct or found", status: false })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Unsuccessfull login. Please Try Again...", status: false })
    }
}

const deleteUser = async (req, res) => {
    console.log(req.body)
    try {
        const _id = req.body._id;
        const existingUser = await User.findById(_id)
        if (!existingUser) {
            res.status(404).json({ message: "User does'nt exist or it is already deleted.", status: false })
        }
        await User.findByIdAndDelete(_id)
        res.status(200).json({ message: "User deleted Successfully", status: true })
    } catch (err) {
        res.status(500).json({ message: "Failed to delete User", status: false })
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const _id = req.body._id;
        const existingUser = await User.findById(_id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found", status: false });
        }
        // if(existingUser.userName == req.body.userName){
        //     return res.status(409).json({ message: "Please update userName.", status: true }) 
        // }
        // const userNameExists = await User.findOne({ userName: req.body.userName });

        existingUser.userName = req.body.userName
        existingUser.role = req.body.role

        const updatedUser = await existingUser.save();

        res.status(200).json({ message: "User info Updated", status: true, updatedUser })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong. Failed to update info", status: false })
    }
}

const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const created_by = req.user._id;
        const users = await User.find({ created_by }).skip((page - 1) * limit)
            .limit(limit);
        const totalCount = await User.countDocuments({ created_by });
        if (!users) {
            return res.status(204).json({ message: "No users available.", status: false })
        }
        res.status(200).json({ message: "All users fetched successfully.", status: true, users, totalCount })
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", status: false })
    }
}

const getTasksByRole = async (req, res) => {
    try {
        const userRole = req.params.role;
        const users = await User.find({ role: userRole })
        if (!users) {
            return res.status(204).json({ message: "No users assigned to this task.", status: false })
        }
        res.status(200).json({ message: "Users Found", status: true, users })
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", status: false })
    }
}

exports.getTasksByRole = getTasksByRole;
exports.getAllUsers = getAllUsers;
exports.updateUserInfo = updateUserInfo;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
exports.loginUser = loginUser;