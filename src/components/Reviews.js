import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from './Firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const Reviews = ({ id, prevRating, userRated }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState('')
    const [data, setData] = useState([]);
    const [addedNew, setAddedNew] = useState(0); 
    const [reviewsloading, setReviewLoading] = useState(false)
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate(); 

    const sendReview = async () => {
        setLoading(true);
        try {
            if (useAppstate.login) {
                await addDoc(reviewsRef, {
                    movieid: id,
                    name: useAppstate.userName,
                    rating: rating,
                    feedback: form,
                    timestamp: new Date().getTime()
                })
                const ref = doc(db, 'movies', id)
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1,
                })
                setRating(0);
                setForm("");
                setAddedNew(addedNew+1)
                swal({
                    title: "Review Sent",
                    icon: 'success',
                    buttons: false,
                    timer: 3000,
                })
            }
            else {
                navigate('/login')
            }
        }
        catch (error) {
            swal({
                title: error.message,
                icon: 'error',
                buttons: false,
                timer: 3000,
            })
        }
        setLoading(false);
    }
    useEffect(() => {
        async function getData() {
            setReviewLoading(true)
            setData([])
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewLoading(false)
        }
        getData();
    },[addedNew])

    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Share you feedback'
                className='header mt-4 w-full p-2 outline-none'
            />
            <button
                onClick={sendReview} className='bg-green-600 flex justify-center mt-2 w-full p-2'>
                {loading ? <TailSpin height={20} color='white' /> : 'Share'}</button>

            {reviewsloading ?
                <div className='mt-6 flex justify-center'><ThreeDots height={10} color='white' /></div>
                :
                <div mt-4>
                    {data.map((e, i) => {
                        return (
                            <div className='header text-blue-600 w-full border-b border-gray-600 mt-2' key={i}>
                                <div className='flex items-center '>
                                    <p>{e.name}</p>
                                    <p className='text-white ml-4 text-xs'>{new Date(e.timestamp).toLocaleString()} </p>
                                </div>
                                <ReactStars
                                    size={15}
                                    half={true}
                                    value={e.rating}
                                    edit={false}
                                />
                                <p className='text-white'>{e.feedback}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Reviews