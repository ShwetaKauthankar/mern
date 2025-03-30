import React, { useEffect, useState } from 'react';
import { FormControl, Box, TextField, styled, Button, } from "@mui/material";
import "./addUser.css";
import axios from 'axios';

const TextFieldRenew = styled(TextField)`
padding: 10px;
`

const AddUser = ({setOpenModal, selectedUser, showEdit, message}) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: ""
})

useEffect(() => {
    if(showEdit && selectedUser){
        setName(selectedUser?.name || '');
        setEmail(selectedUser?.email || '');
        setAddress(selectedUser?.address || '');
    } else {
        setName('');
        setEmail('');
        setAddress('');
    }
    setErrors({name: "", email: "", address: ""});
}, [showEdit, selectedUser]);

const validateForm = () => {
    let isValid = true;
    
    const newError = {name: "", email: "", address: ""};

    if(!name.trim()){
        newError.name = "Name is required"
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.trim()){
        newError.email = "Email ID is required"
        isValid = false
    } else if(!emailRegex.test(email)){
        newError.email = "Invalid email format";
        isValid = false;
    }

    if(!address.trim()){
        newError.address = "Address is required";
        isValid = false;
    }

    setErrors(newError);
    return isValid;
}

const addUser = async() => {
 await axios.post('http://localhost:8000/api/user', {name, email, address}).then((res) => {
    message("User added successfully");
    setOpenModal(false);
 }).catch((e) => console.log(e))
}

const editUser = async() => {
    await axios.put(`http://localhost:8000/api/update/user/${selectedUser._id}`, {name, email, address}).then((res) => {
        message("User updated successfully");
        setOpenModal(false);
     }).catch((e) => console.log(e))
}

const handleSubmit = () => {
    if(validateForm()){
        if (showEdit) {
        editUser();
        } else {
        addUser();
        }
    }
  };

  return (
    <div className='addUser'>
      <h3 style={{textAlign: 'center', marginTop: '10px'}}>{showEdit ? 'Edit User' : 'Add New User'}</h3>
      <form className='addUserForm'>
        <TextFieldRenew
          required
          id="outlined-required"
          label='Enter Name'
          value={name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextFieldRenew
          required
          id="outlined-required"
          label="Enter EmailId"
          value={email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextFieldRenew
          required
          id="outlined-required"
          label='Enter address'
          value={address}
          error={!!errors.address}
          helperText={errors.address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant='outlined' color='primary' onClick={handleSubmit} disabled={!name || !email || !address}>
            Submit
        </Button>
      </form>
    </div>
  )
}

export default AddUser
