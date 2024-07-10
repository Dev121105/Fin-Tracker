import React, { useState } from 'react'
import "./style.css"
import Input from '../Input';
import Buttons from '../Buttons';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth,db, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';


function SignupSignincomponent() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[loading,setLoading]=useState(false)
    const[loginForm,setLoginForm]=useState(false)
    const navigate = useNavigate()

    function signupWithEmail(){
        console.log("Name", name);
        console.log("email", email);
        console.log("pass", password);
        console.log("Cpass", confirmPassword);

        if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
            if (password==confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                    const user = userCredential.user;
                    toast.success('user created')
                    console.log("User signed up successfully!",user);
                    setLoading(false)
                    setName("")
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    createDoc(user)
                    navigate("/dashboard")
                     })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                    setLoading(false)
                // ..
                });
            }
            else{
                toast.error("Passwords don't match")
                setLoading(false)
            }
        }else{
            toast.error("All fileds  are Mandatory")
            setLoading(false)
        }
    }

    function loginWithEmail() {
        console.log("email", email);
        console.log("pass", password);  

         if( email!="" && password!="" ){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            toast.success('User Logged In')
            console.log("User signed in successfully!",user);
            setEmail("")
            setPassword("")
            navigate("/dashboard")
            setLoading(false);
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoading(false);
        });

         } else {
             toast.error("All fields are mandatory!")
             setLoading(false);
         }
       
    }

   async function createDoc(user){
    setLoading(true);
    if(!user)return;

    const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef);
    if(!userData.exists()){
        try{
            await setDoc(doc(db, "users",user.uid), {
            name: user.displayName ? user.displayName : name,
            email: user.email,
            photoURL: user.photoURL ? user.photoURL : "",
            createdAt: new Date()   ,
            });
            toast.success("doc created successfully")
            setLoading(false);
        }
        catch(error){
            toast.error("Failed to create user document")
            setLoading(false);
        }
    }else{
        // toast.error("Doc already exists ")
        setLoading(false);
    }
   }

 function googleAuth(){
    setLoading(true);
    try {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user",user)
          createDoc(user)
          navigate("/dashboard")
          toast.success("User authenticated")
          setLoading(false);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("User not authenticated")
          setLoading(false);
        });
        
    } catch (e) {
        toast.error(e.message)
    }
   

 }

  return (
    <>
    {loginForm ? (
        <div className='login-wrapper'>
        <h2 className='title' >
            Login On <span style={{color:"var(--theme)"}}>Fin-Tracker</span> 
        </h2>
        <form>
           
            <Input 
                type="email"
                label={'Email'} 
                state={email} 
                setState={setEmail} 
                placeholder={"JhonDoe@gmail.com"} 
            />
            <Input 
                type="password"                
                label={'Password'} 
                state={password} 
                setState={setPassword} 
                placeholder={"Ex :- 12345678"} 
            />
           
            <Buttons 
            disabled={loading}
            text={ loading ? "Loading..." : "Login Using Email and Password" } 
            onCLick={loginWithEmail} />
            <p className='p-login'>or</p>
            <Buttons 
            onCLick={googleAuth}
            text={ loading ? "Loading..." : "Login Using Google" } 
            blue={true} />

            <p className='p-login' onClick={()=>setLoginForm(!loginForm)}>
                Or Don't Have An Account? <span style={{color:"var(--theme)"}}>Click Here</span>
            </p>
        </form>
    </div>
    ):(
        <div className='signup-wrapper'>
        <h2 className='title' >
            Sign Up On <span style={{color:"var(--theme)"}}>Fin-Tracker</span> 
        </h2>
        <form>
            <Input 
                label={'Full Name'} 
                state={name} 
                setState={setName} 
                placeholder={"Jhon Doe"} 
            />
            <Input 
                type="email"
                label={'Email'} 
                state={email} 
                setState={setEmail} 
                placeholder={"JhonDoe@gmail.com"} 
            />
            <Input 
                type="password"                
                label={'Password'} 
                state={password} 
                setState={setPassword} 
                placeholder={"Ex :- 12345678"} 
            />
            <Input 
                type="password"
                label={'Confirm Password'} 
                state={confirmPassword} 
                setState={setConfirmPassword} 
                placeholder={"Ex :- 12345678"} 
            />
            <Buttons 
            disabled={loading}
            text={ loading ? "Loading..." : "Signup Using Email and Password" } 
            onCLick={signupWithEmail} />
            <p className='p-signupOr'>Or</p>
            <Buttons 
            onCLick={googleAuth}
            text={ loading ? "Loading..." : "Signup Using Google" } 
            blue={true} />
            <p className='p-signup' onClick={()=>setLoginForm(!loginForm)}>
                Or Have An Account Already? <span style={{color:"var(--theme)"}}>Click Here</span>
            </p>
        </form>
    </div>
    )}
       
    </>
  )
}

export default SignupSignincomponent;