import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from './Firebase/firebase'
import bcrypt from 'bcryptjs'; 
import { Appstate } from '../App'

const Login = () => {
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        mobile: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const login = async()=> { 
        setLoading(true)
        try {
            const quer = query(usersRef, where('mobile','==', form.mobile))
            const querySnapshot = await getDocs(quer)
            querySnapshot.forEach((doc)=> { 
                const _data = doc.data(); 
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if(isUser) { 
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name)
                    swal({
                        title: "Logged In",
                        icon: 'success',
                        buttons: false,
                        timer: 3000,
                    })
                    navigate('/')
                } else { 
                    swal({
                        title: "Invalid Credentials",
                        icon: 'error',
                        buttons: false,
                        timer: 3000,
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message, 
                icon: 'error',
                buttons: false,
                timer: 3000,
            })
        }
        setLoading(false)
    }

    return (
        <div className='w-full mt-8 flex flex-col items-center'>
            <h1 className='text-xl font-bold'> Login </h1>
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
                    onClick={login}
                    className="mt-3 flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-900 rounded text-lg">
                    {loading ? <TailSpin height={25} color='white' /> : 'Login'} </button>
            </div>
            <div className='pt-3'>
                <p> Do not have account? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span> </Link> </p>
            </div>
        </div>
    )
}

export default Login