import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../UserContext";

function Manage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editedUser,setEditedUser] = useState({});
  const [editOpen,setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [staff_id, setStaff_id] = useState("");
  const [role, setRole] = useState("manager");
  const [gender, setGender] = useState("male");
  const [del, setDel] = useState(false);
  const [selectedUser,setSelectedUser]= useState(null);
  const { handleCreate,handleDelete,handleUpdate } = useAppContext();
  const { users } = useAppContext();

  const handleStaffDelete = (staffId) => {
    setDel(true);
    setSelectedUser(staffId)
  };
  function FormatedDate({timeGiven}){ 
    if (timeGiven ==null) { return <span>null</span>}
   const dateObject = new Date(timeGiven?.seconds*1000);
   
    const year = dateObject.getFullYear().toString()
    const month = (dateObject.getMonth()+1).toString()
    const day = dateObject.getDate().toString()
    const hours = dateObject.getHours().toString()
    const minutes = dateObject.getMinutes().toString()
    const seconds = dateObject.getSeconds().toString()


                
    return  <span>{year+"-"+month+"-"+day+"\t"+"\t"+hours+"-"+minutes+"-"+seconds}</span>
   
  }
 
  return (
    <div className="w-fulljustify-center flex flex-col">
      <div className="bg-purple-200 p-3 w-full items-center justify-between flex">
        <span className="text-2xl    font-bold">Manage staff</span>
        <Button onClick={() => setIsOpen(true)}>Add Staff</Button>
      </div>
      <Table sx={{ height: "70px" }}>
        <TableHead>
          <TableRow className="bg-slate-200">
            <TableCell>S.No</TableCell>
            <TableCell>Staff</TableCell>
            <TableCell>PhoneNumber</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>createdAt</TableCell>
            <TableCell>updatedAt</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, sn) => (
            <TableRow key={sn}>
              <TableCell>{sn + 1}</TableCell>
              <TableCell>{item.name}</TableCell>

              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell><FormatedDate timeGiven={item.createdAt} /></TableCell>
              <TableCell><FormatedDate timeGiven={item.updatedAt} /></TableCell>

              <TableCell>
                <Button onClick={() => {setEditOpen(true);setEditedUser(item)}}>EDIT</Button>
                <Button onClick={() => handleStaffDelete(item.id,item.userId)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Add user modal */}
      <Modal
        className="w-fullh-full flex items-center justify-center"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder={"name"}
              onChange={(e) => setName(e.target.value)}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="staff_id">
              Staff Id
            </label>
            <input
              type="number"
              id="staff_id"
              value={staff_id}
              placeholder={"staff_id"}
              onChange={(e) => setStaff_id(e.target.value)}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              placeholder={"role"}
              onChange={(e) => setRole(e.target.value)}
              className="p-1"
            >
              <option value="manager">Manager</option>
              <option  value="digital marketing" >Digital Marketing</option>
              <option  value="developers">Developers</option>
            </select>
          </div>
          <div>
            <span className="font-bold">Gender</span>
            <div className="flex gap-10">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={gender=="male"}
                  onChange={() => setGender("male")}
                  value="male"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="fename"
                  name="gender"
                  checked={gender == "female"}
                  onChange={() => setGender("female")}
                  value="female"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              handleCreate({ name, role, gender });
              setName("")
              
              setRole("")
              setIsOpen(false);
            }}
          >
            Add user
          </Button>
        </form>
      </Modal>
      {/* Edit modal */}
      <Modal
        className="w-full h-full flex items-center justify-center"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editedUser.name}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,name:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={editedUser.email}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,email:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={editedUser.address}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,address:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
            
              value={editedUser.phoneNumber}
              onChange={(e) =>  setEditedUser(prev=>({...prev,phoneNumber:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="role">
              Role
            </label>
            <select
              id="role"
             
              onChange={(e) =>  setEditedUser(prev=>({...prev,role:e.target.value}))}
              className="p-1"
            >
              <option selected={editedUser.role == "manager"} value="manager">Manager</option>
              <option selected={editedUser.role == "digital marketing director"} value="digital marketing director">Digital Marketing</option>
              <option selected={editedUser.role == "developer"} value="developers">Developers</option>
            </select>
          </div>
          <div>
            <span className="font-bold">Gender</span>
            <div className="flex gap-10">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={editedUser.gender == "male"}
                  onChange={() =>  setEditedUser(prev=>({...prev,gender:"male"}))}
                  value="male"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="fename"
                  name="gender"
                  checked={editedUser.gender == "female"}
                  onChange={() => setEditedUser(prev=>({...prev,gender:"female"}))}
                  value="female"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="bio">
              Bio
            </label>
            <textarea
              
              id="bio"
              value={editedUser.bio}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,bio:e.target.value}))}
              className="p-1"
            />
          </div>
          <Button
            onClick={() => {
              console.log(editedUser)
              handleUpdate(editedUser);
              setEditOpen(false);
            }}
          >
            Edit user
          </Button>
        </form>
      </Modal>
      <Modal
        className="w-fullh-full flex items-center justify-center"
        open={del}
        onClose={() => setDel(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex gap-20">
              <Button onClick={() =>{ if(selectedUser!==null){handleDelete(selectedUser);setDel(false)}else{alert("no user chosen")}}}>Yes</Button>
              <Button onClick={()=>setDel(false)} color="error">No!</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Manage;
