import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore'
import { moviesRef } from './Firebase/firebase.js';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { Appstate } from '../App.js';

const AddMovie = () => {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    year: "",
    image: "",
    description: "",
    rated: 0,
    rating: 0
  })
  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    setLoading(true);
    if (useAppstate.login) {
      await addDoc(moviesRef, form);
      swal({
        title: 'Successfully Added',
        icon: 'success',
        buttons: false,
        timer: 3000
      })
    }
    else {
      navigate('/login')
    }
    setLoading(false);
  }

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-6">
            <h1 className="sm:text-xl text-2xl font-medium title-font mb-4 text-white">Add New Movie</h1>    </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-300">Name</label>
                  <input
                    type="text" id="name"
                    name="name"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="year" className="leading-7 text-sm text-gray-300">Year</label>
                  <input
                    type="year" id="year" name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-gray-100   rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="image" className="leading-7 text-sm text-gray-300">Image Link</label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    type="url" id="image" name="image" className="w-full bg-gray-100   rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-gray-300">Description </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <Link to={'/'}>
                  <button onClick={addMovie} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                    {loading ? <TailSpin height={25} color='white' /> : 'Submit'} </button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddMovie