import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import {RecaptchaVerifier, getAuth, signInWithPhoneNumber} from 'firebase/auth'
import app, { usersRef } from './Firebase/firebase'
import swal from 'sweetalert'; 
import { addDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'


const auth = getAuth(app)
const Signup = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const generateRecaptcha = () => { 
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size':'invisible',
            'callback':(response)=> {
            }
        },); 
    }

    const requestOtp = ()=> { 
        setLoading(true);
        generateRecaptcha(); 
        let appVerifier = window.recaptchaVerifier; 
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => { 
            window.confirmationResult = confirmationResult;
            swal({
                text: 'OTP Sent',
                icon: 'success',
                button : false, 
                timer : 3000,
            }); 
            setOtpSent(true); 
            setLoading(false); 
        }).catch((error)=> { 
            console.log(error)
        })
    }

    const verifyOtp = async () => {
        try { 
            setLoading(true)
            window.confirmationResult.confirm(otp).then((result)=> { 
                uploadData(); 
                swal({ 
                    text: 'Sucessfully Registered',
                    icon: 'success',
                    button: 'false', 
                    timer: '3000'
                })
                navigate('/login')
                setLoading(false); 
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    const uploadData = async () => { 
        const salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(form.password, salt); 

        await addDoc(usersRef, {
          name: form.name, 
          password: hash,
          mobile: form.mobile
        })
    }

    return (
        <div className='w-full mt-8 flex flex-col items-center'>
            <h1 className='text-xl font-bold'> Sign Up </h1>
            {otpSent ?
                <>
                    <div className="relative">
                        <label for="otp" className="leading-7 text-sm text-gray-300">OTP</label>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div>
                        <button 
                        onClick={verifyOtp}
                        className="mt-3 flex mx-auto text-white bg-green-700 border-0 py-1 px-2 focus:outline-none hover:bg-green-900 rounded text-lg">
                            {loading ? <TailSpin height={20} color='white' /> : 'Confirm OTP'} </button>
                    </div>
                </>
                :
                <>
                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label for="Name" className="leading-7 text-sm text-gray-300">Name</label>
                            <input
                                type={"text"}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label for="mobile" className="leading-7 text-sm text-gray-300">Mobile No.</label>
                            <input
                                type={"number"}
                                value={form.mobile}
                                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label for="message" className="leading-7 text-sm text-gray-300"> Password </label>
                            <input
                                value={form.password}

                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                type="password" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div>
                        <button
                        onClick={requestOtp}
                        className="mt-3 flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                            {loading ? <TailSpin height={25} color='white' /> : 'Request OTP'} </button>
                    </div>

                </>
            }

            <div className='pt-3'>
                <p> Already have an account? <Link to={'/login'}><span className='text-blue-500'>Login</span> </Link> </p>
            </div>
            <div id='recaptcha-container'></div>
        </div>
    )
}

export default Signup