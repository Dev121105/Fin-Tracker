import React, { useEffect } from 'react'
import "./style.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/user.svg"
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
   if (user) {
    navigate("/dashboard")
   }
  }, [user, loading]);
  

  function logoutfnc(){
    try {
      signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out successfully")
        navigate("/")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
    } catch (e) {
      toast.error(e.message);
    }
   
  }
  return (
    <div className='navbar'>
      <p className='logo' >Fin-Tracker.</p>
      {user && ( 
        <div style={{display:"flex",alignItems:"center",gap:"1px"}}>
          <img src={user.photoURL ? user.photoURL : userImg} style={{width:"2rem",height:"2rem",borderRadius:"50%"}}/>
        <p className='logo link' onClick={logoutfnc} >
          Logout
        </p>  
        </div>
        )}
    </div>
  );
}

export default Header