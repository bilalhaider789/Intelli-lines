import { createContext, useContext, useState,useEffect } from "react";

const Authcontext=createContext({
    userid: null,
    username:null,
    useremail:null,
    login:()=>{},
    logout:()=>{},
    loggedIn:false

})

export const AuthcontextProvider=(props)=>{

    const [username,setusername]=useState(null)
    const [userid,setuserid]=useState(null)
    const [useremail,setuseremail]=useState(null)
    const [useractor,setuseractor]=useState(null)
    const [loggedIn,setloggedIn]=useState(false)

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setloggedIn(true);
          setuserid(localStorage.getItem('userid'))
          setusername(localStorage.getItem('username'))
          setuseremail(localStorage.getItem('email'))
          setuseractor(localStorage.getItem('actor'))
        }
      },);


    const logouthandler=()=>{
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem("userid")
        // localStorage.removeItem("username")
        // localStorage.removeItem("email")
        localStorage.removeItem("actor")
        setloggedIn(false)
    }
    const logInhandler=(user)=>{
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem("userid",user.userid)
        localStorage.setItem("username",user.name)
        localStorage.setItem("email",user.email)
        localStorage.setItem("actor",user.actor)
        setloggedIn(true)
    }
    
    return(
        <Authcontext.Provider value={{loggedIn ,useremail,username,userid ,useractor,logout: logouthandler, login:logInhandler}}>
            {props.children} 
        </Authcontext.Provider>
    )
}

export default Authcontext;