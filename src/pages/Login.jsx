import React, { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { signin, signup } = useAuth();

    const namesignupRef = useRef();
    const emailsignupRef = useRef();
    const passwordsignupRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signin(email, password, navigate);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const name = namesignupRef.current.value;
        const email = emailsignupRef.current.value;
        const password = passwordsignupRef.current.value;

        signup(name, email, password, navigate);
    };

    return (
        <div>
            <Header />
            <div className="bg-[url('menubackground.jpg')] flex flex-wrap bg-cover bg-no-repeat w-full h-full">
                <div className="w-1/2 pl-3 min-w-56 space-y-4 flex flex-col">
                    <form onSubmit={handleLogin}>
                        <p className="font-semibold">LOG IN</p>
                        <input ref={emailRef} type="text" placeholder='EMAIL ADDRESS' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-6/12' />
                        <input ref={passwordRef} type="password" placeholder='PASSWORD' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-6/12 block' />
                        <Link>FORGOT PASSWORD</Link>
                        <button className='bg-green-800 font-semibold text-white text-base rounded-lg items-center px-2 py-1 block my-2'>LOGIN</button>
                    </form>
                    <div className='space-y-4'>
                        <button className='bg-blue-500 flex gap-2 rounded-lg font-semibold text-lg items-center px-2 py-1 my-2'><FaFacebook />Sign in with Facebook</button>
                        <button className="bg-red-500 flex gap-2 rounded-lg font-semibold text-lg items-center px-2 py-1 my-2"><FaGoogle />Sign in with Google</button>
                    </div>
                </div>
                <div className="w-1/2 min-w-56">
                    <form onSubmit={handleSignup}>
                        <p className="font-bold text-xl">CREATE ACCOUNT</p>
                        <BsPersonCircle size={44} />
                        <input ref={namesignupRef} type="text" placeholder='NAME' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-9/12' />
                        <input type="text" placeholder='BIRTHDAY' className='block shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-9/12' />
                        <input type="text" placeholder='+254' readOnly className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-2/12' />
                        <input type='number' placeholder='MOBILE NUMBER' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-6/12' />
                        <input ref={emailsignupRef} type="email" placeholder='EMAIL ADDRESS' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-9/12' />
                        <input ref={passwordsignupRef} type="password" placeholder='PASSWORD' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-9/12' />
                        <input type="password" placeholder='CONFIRM PASSWORD' className='shadow-md container rounded py-1 mt-1 pl-3 border border-gray-400 w-9/12' />
                        <button className='bg-green-800 rounded-lg font-semibold text-lg items-center px-2 py-1 block my-2'>SIGN UP</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
