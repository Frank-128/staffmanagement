import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,  } from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const appContext = createContext();

function UserContext({ children }) {
  const [username, setUsername] = useState("frank");
  const [users, setUsers] = useState([]);
  const [loggedUser,setLoggedUser] = useState({active:false});
  const [errors,setErrors] = useState({status:false,payload:null})
  const navigate = useNavigate();
  
  const handleCreate = async (staff) => {
    
    try {
   await   createUserWithEmailAndPassword(auth,staff.email,staff.password).then(async(response)=>{ const docRef = await addDoc(collection(db, "staff"), {
        name:staff.name,
        userId:response.user.uid,
        email:staff.email,
        gender:staff.gender,
        role:staff.role,
        bio:staff.bio,
        phoneNumber:staff.phoneNumber,
        address:staff.address,
       createdAt:serverTimestamp(), 
       updatedAt: null
      });
   
    }).catch((error)=>{console.log("error occured",error); setErrors({status:true,payload:error})})
    
      console.log("Document written with ID: ");
    } catch (e) {
      setErrors({status:true,payload:e})
      console.error("Error adding document: ", e);
    }
    handleRead();
    navigate('/');
  };
  const handleUpdate = async (staffs) => {
    
    try {
      

      const docRef = doc(db, "staff", staffs.id);

      const data = {
        staff:{name:staffs.name,
          staff_id:staffs.staff_id,
          gender:staffs.gender,
          role:staffs.role,
          updatedAt: serverTimestamp()
          
        }
      };
     

     await updateDoc(docRef,{ name:staffs.name,
      address:staffs.address,
      email:staffs.email,
      phoneNumber:staffs.phoneNumber,
      gender:staffs.gender,
      role:staffs.role,
      bio:staffs.bio,
     
     updatedAt: serverTimestamp()});
      
    } catch (e) {
      setErrors({status:true,payload:e})
      console.error("Error adding document: ", e);
    }
    handleRead();
  };
  const handleLogin = async (email,password)=>{
    await signInWithEmailAndPassword(auth,email,password).then((item)=>{
      
      const validUser = users.find((val)=>val.userId == item.user.uid);
      setLoggedUser({active:true,...validUser})
      navigate('/');

    }).catch((err)=>{console.log("error from login ",err); setErrors({status:true,payload:err})})
  }
  const handleLogout = async()=>{
    await signOut(auth).then(()=>{
      setLoggedUser({active:false})
      navigate('/');
    })
  }
  const handleRead = async () => {
    try {
      
      const docRef = await getDocs(query(collection(db, "staff"),orderBy("createdAt","desc")));
      setUsers(docRef);
      const data = [];
      docRef.forEach((item) =>
        setUsers(data.push({ id: item.id, ...item.data() }))
      );

      setUsers(data);
    } catch (err) {
      setErrors({status:true,payload:err})
      console.log("error reading document", err);
    }
  };
  const handleDeleteAccount = async()=>{
    const user = auth.currentUser;
    await user.delete()
    Swal.fire({title:'Success',text:'Account deleted successfully',timer:3000,icon:'success'});
    setLoggedUser({active:false})
    navigate('/');
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "staff", id));
    
     
      console.log("deleted record successfully");
      handleRead();
    } catch (err) {
      setErrors({status:true,payload:err})
      console.log(err);
    }
  };
  useEffect(() => {
    handleRead();
  }, []);

  return (
    <appContext.Provider
      value={{
        username,
        users,
        loggedUser,
        handleCreate,
        handleRead,
        handleDelete,
        handleUpdate,
        handleLogin,
        handleLogout,
        handleDeleteAccount,
        errors
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default UserContext;

export const useAppContext = () => {
  return useContext(appContext);
};
