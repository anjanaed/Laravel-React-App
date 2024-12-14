import {useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import { useStateContext } from '../../contexts/contextprovider';
import axiosClient from '../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register=()=>{

    const notifyErr=(message)=>{toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });};


    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();

    const {setUser,setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
            window.location.href = '/user';
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            const errors = response.data.errors;
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    notifyErr(errors[key][0]);
                }
            }

        }
    });
}


    return(
        <div className='login-signup-form animated fadeinDown'>
            <ToastContainer/>
        <div className='form'>
            <h1 className='title'>
                Create A New Account
            </h1>
            <form onSubmit={Submit}>
                <input ref={nameRef} type="name" placeholder='Name'/>
                <input ref={emailRef}  type="email" placeholder='Email'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <button className='btn btn-block'>Register</button>
                <p className='message'>
                    Already Have An Account? <Link to='/login'>Login</Link>
                </p>
            </form>
        </div>
        
    </div>
 

    )

}

export default Register;