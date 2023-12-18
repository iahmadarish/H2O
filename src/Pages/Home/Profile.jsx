import React, { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import cover from '../../assets/cover.webp'
import { TbUsersPlus } from "react-icons/tb";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { TiMediaFastForwardOutline } from "react-icons/ti";
import { FaFaceSmileWink } from "react-icons/fa6";
import { BiSolidCloudUpload } from 'react-icons/bi';
import profile from '../../assets/profilepic.jpg'
import { FiUploadCloud } from "react-icons/fi";
import { userLoginInfo } from '../../Slices/userSlice';
import Leftprofile from './Leftprofile';
import Rightprofile from './Rightprofile';
import { IoLogOutOutline } from 'react-icons/io5';
import Cover from './Cover';
import back from '../../assets/back.jpg'
import { motion } from "framer-motion"





const Profile = () => {


    const auth = getAuth();
    const dispatch = useDispatch()
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const navigate = useNavigate()
    const [verify, setVerify] = useState(false)



    

    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    }, [])

    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
            setVerify(true)
            dispatch(userLoginInfo(user))
            localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user)))

        }
    });

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                navigate('/reg')
            }, 100);

        }).catch((error) => {
            console.log(error.code);
        });
    }


    const handleImageUpload = () => {
        console.log('first')
    }

    const handleFnf =() =>{
        navigate('/fnf')
    }


    return (

        <div className='overflow-x-hidden '>
            {/* navbar  */}
            <div className='bg-[#dce305] flex justify-between py-[20px] px-[70px] '>
                <div>
                    <h1 className='font-josef font-bold text-[55px] text-[black] flex' >H2<FaFaceSmileWink className='text-[55px]' />
                    </h1>
                </div>
   
                <div className='flex gap-x-[100px]'>
                <p className='font-bold font-josef text-[22px] text-[black] flex cursor-pointer'>  
                    <IoLogOutOutline onClick={handleSignOut} className='cursor-pointer mx-auto text-[30px] text-[black] mr-2' /> log out
                    </p>
                    <p onClick={handleFnf} className='font-bold font-josef text-[22px] text-[black] flex cursor-pointer'> <TbUsersPlus className='text-[30px] mr-[5px]' /> Friends & family </p>
                    <p className='font-bold font-josef text-[22px] text-[black] flex'> <BiSolidMessageSquareDots className='text-[30px] mr-[5px]' /> Message </p>
                    <p className='font-bold font-josef text-[22px] text-[black] flex'> <TiMediaFastForwardOutline className='text-[30px] mr-[8px] ' /> Real </p>
                 
                </div>

            </div>

            {/* profile content  */}
            {/* bg-[url("./src/assets/coverbg.avif")] bg-cover */}
            <div className=' bg-[#dce305] flex justify-between  items-center px-[70px] pb-[70px]'>
                <div className=" bg-[#fff] px-[30px] py-[50px] rounded-[2%]">
                    <Leftprofile />
                </div>
                <div className="mt-[30px]">
                    <Cover />
                </div>
            </div>

        </div>

    )
}

export default Profile