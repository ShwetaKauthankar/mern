import User from "../model/userModel.js";

export const create = async(req, res) => {
    try{
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({ message: "User already exists"});
        }
        const saveData = await newUser.save();
        // res.status(200).json(saveData);
        res.status(200).json({message: "User created successfully"});
    } catch(error){
        res.status(500).json({errorMessage: error.message});        
    }
}

export const getAllUsers = async(req, res) => {
    try{
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(400).json({message: "No user data found"});
        }
        res.status(200).json(userData);
    } catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

export const getUserById = async(req,res) => {
    try{
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(400).json({message: "User doesnt exists"});
        }
        res.status(200).json(userExists);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

export const update = async(req, res) => {
    try{
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            res.status(400).json({message: "User not exists"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        // res.status(200).json(updatedData);
        res.status(200).json({message: "User updated successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
} 

export const deleteUser = async(req,res) => {
    try{
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            res.status(400).json({message: "User not exists"});
        }
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}