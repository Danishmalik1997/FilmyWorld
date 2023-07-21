import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import { moviesRef } from './Firebase/firebase';
import { Link } from 'react-router-dom';

export const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _data = await getDocs(moviesRef)
            _data.forEach((doc)=> {
               setData((prv)=> [...prv,{...(doc.data()), id: doc.id}])
            })
            setLoading(false)
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-between px-3 mt-2'>
            {loading ? <div className='w-full h-96 flex justify-center items-center'>
                <ThreeDots height={40} color='white'/></div> : 
                data.map((e, i) => {
                return (
                <Link to={`/detail/${e.id}`}>     
                    <div key={i} className='transition-all s  duration-500 mt-6 cursor-pointer hover:-translate-y-4'>
                        <img className="h-60 md:h-72" src={e.image} alt='' />
                        <h1>{e.name} </h1>
                        <h1 className='flex items-center mr-5'>
                            <span className='mr-1.5 text-gray-400'>Rating : </span>
                            <ReactStars
                                size={20}
                                half={true}
                                value={e.rating/e.rated}
                                edit={false} /></h1>
                        <h1><span className='text-gray-400'>Year : </span>{e.year}</h1>
                    </div>
                </Link>)
            })
            }
        </div>
    )
}
