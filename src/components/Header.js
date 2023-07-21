import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';


export const Header = () => {
    const useAppstate = useContext(Appstate);

    return (
        <div className='sticky top-0 z-10 header text-3xl items-center flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-50'>
            <Link to={'/'}><span className='cursor-pointer'>Filmy<span className='text-white'>World </span></span></Link>
            {useAppstate.login ?
                <Link to={'/AddMovie'}><Button className=''><h1 className='cursor-pointer text-lg flex items-center'>
                    <AddIcon className='mr-2 text-white' /> Add New </h1></Button>
                </Link>
                :
                <Link to={'/Login'}>
                    <Button variant="contained" color="success"><h1 className='capitalize font-medium text-white cursor-pointer text-base flex items-center'>
                        Login</h1></Button>
                </Link>
            }
        </div>
    )
}

