import React, { useEffect, useState } from 'react';
import "./user.css";
import axios from 'axios';
import { Dialog, Pagination, TextField, Snackbar } from "@mui/material";
import AddUser from '../adduser/AddUser';

const User = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const fetchData = async() => {
        try{
            const res = await axios.get('http://localhost:8000/api/users');
            setUsers(res.data);
            setFilteredUsers(res.data);
        } catch(e) {
            console.log("Error while fetching data: ", e);
        }
    }

    useEffect(() => {   
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        console.log("query", query);
        
        setSearchQuery(query);

        const filteredData = users.filter((user) => 
            user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.address.toLowerCase().includes(query)
        )

        setFilteredUsers(filteredData);
        setCurrentPage(1);
      }
    

    const handleClickOpen = () => {
        setOpen(true);
        setShowEdit(false);
        setSelectedUser(null);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      

      const handleNewUser = () => {
        setOpen(false);
        fetchData();
      };

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
            showSnackbar(res.data.message);
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
            showSnackbar("Failed to delete user");
        }
    };

      const handleClickEditOpen = (data) => {
        setOpen(true);
        setShowEdit(true);
        setSelectedUser(data);
      }
      
      const handlePageChange = (event, value) => {
        setCurrentPage(value);
      }

      const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      const showSnackbar = (msg) => {
        setSnackbarMsg(msg);
        setSnackbarOpen(true);
      }

      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
      }

 
    return (
        <div className='userTable'>
            <div className='searchField'>
            <TextField 
            label="Search"
            variant='outlined'
            value={searchQuery}
            className='searchBox'
            onChange={handleSearch}
            />
            </div>
            <button type='button' className='btn btn-primary' onClick={handleClickOpen}>
                Add User <i className="fa-solid fa-user-plus"></i>
            </button>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th scope='col'>Sr. No.</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => {
                        return (
                        <tr key={user._id}>
                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td className='actionButtons'>
                        <button type="button" className="btn btn-info" onClick={() => handleClickEditOpen(user)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                        <i className="fa-solid fa-trash"></i>
                        </button>
                        </td>
                    </tr>
                    )})}
                </tbody>
            </table>
            <Pagination 
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            />

      <Dialog open={open} onClose={handleClose}>
        <AddUser setOpenModal={handleNewUser} selectedUser={showEdit ? selectedUser : null} showEdit={showEdit} message={showSnackbar} />
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbarMsg}
      />
        </div>
    )
}

export default User;