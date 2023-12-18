import React, { useEffect, useState } from 'react'
import { FaFaceSmileWink } from "react-icons/fa6";
import cover3 from '../../assets/cover3.avif'
import demo from '../../assets/userprofile.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux';




const Fnf = () => {

    const data = useSelector(state => state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [userlist, setUserlist] = useState([])
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            console.log(snapshot.val())
            snapshot.forEach((item) => {
                console.log(item.val())
            arr.push({...item.val()})
            })
            setUserlist(arr)
        });
    }, [])

    return (
        <>
            <div className='bg-[#d1e5da] pt-[50px]  pb-[150px]'>
                <div className='flex justify-between items-center'>
                    <div className='px-[70px]'>
                        <h1 className='font-josef font-bold text-[55px] text-[black] flex' >H2<FaFaceSmileWink className='text-[55px]' />
                        </h1>
                    </div>
                    <div className='flex'>
                        <div className='mr-20'><h1 className='font-josef font-bold text-[30px] text-[black]'> Active user name: </h1></div>
                        <div className="flex gap-x-2 mr-20">
                            <div> <button className='border-1 rounded-lg px-10 py-[8px] bg-white hover:text-white hover:bg-[#7c038a] font-bold transition duration-700 ease-out '> Friend Request </button> </div>
                            <div> <button className='border-1 rounded-lg px-10 py-[8px] bg-[#7c038a] text-white hover:text-black hover:bg-white font-bold transition duration-700 ease-out '>Add story+</button> </div>
                            <div> <button className='border-1 rounded-lg px-10 py-[8px] bg-white hover:text-white hover:bg-[#7c038a] font-bold transition duration-700 ease-out'>Edit profile </button> </div>  </div>
                    </div>
                </div>
                <div className='flex justify-around items-center px-[70px] py-[35px] gap-x-8 '>
                    {/* userlist part  */}
                    <div className="w-1/2 bg-white shadow-[0_15px_70px_-30px_purple] rounded-lg border-2 border-[purple] px-3 pt-4 pb-12 h-[550px] overflow-scroll ">
                        <div className="bg-[white] px-2 rounded-lg flex justify-between items-center">
                            <div className="">
                                <h1 className='font-josef font-bold text-[30px] '>People</h1>
                                <p className='font-josef text-[14px] text-[gray] '>just user in h20</p>
                            </div>
                            <div>
                                <label htmlFor="">
                                    <input className='px-3 py-3 bg-[#dce305] border-1 border-black-500 rounded-full text-black' type="text" placeholder='search user' />
                                </label>
                            </div>
                        </div>
                        {/* each user  */}


                            {
                                userlist.map((item)=>(

                                    <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                                    <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                                    <div className='flex items-center justify-between '>
                                        <div className="flex justify-between">
                                            <div className=''>
                                                <p className='font-josef font-semibold text-[18px] text-black' >{item.username}</p>
                                                <p className='text-black'>{item.email}</p>
                                                <p className='text-black'>Hello ! Welcome to my Profile</p>
                                            </div>
                                            <div className="ml-[70px] gap-x-8 flex items-center ">
                                                <p className='text-black-700  text-center text-[20px] font-bold bg-purple-200 px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                                <p className='text-black-700  text-center text-[20px] font-bold bg-purple-200 px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                                <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
        
                                ))
                            }

                    </div>

                    {/* friends part  */}
                    <div className="w-1/2 bg-white shadow-[0_15px_70px_-30px_purple] rounded-lg border-2 border-[purple] px-3 pt-4 pb-12 h-[550px] overflow-scroll ">
                        <div className="bg-[white] px-2 rounded-lg flex justify-between items-center">
                            <div className="">
                                <h1 className='font-josef font-bold text-[30px] '>Friends and Family</h1>
                                <p className='font-josef text-[14px] text-[gray] '>Connected with h20</p>
                            </div>
                            <div>
                                <label htmlFor="">
                                    <input className='px-3 py-3 bg-[#dce305] border-1 border-black-500 rounded-full text-black' type="text" placeholder='search user' />
                                </label>
                            </div>
                        </div>
                        {/* each user  */}

                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white shadow-[0_15px_70px_-30px_purple] px-2 py-2 border-1 rounded-lg flex gap-x-4 mt-5 '>
                            <p><img className='h-[70px] w-[70px] border-2 border-white rounded-full' src={demo} alt="" /></p>
                            <div className='flex items-center justify-between '>
                                <div className="flex justify-between">
                                    <div className=''>
                                        <p className='font-josef font-semibold text-[18px] text-black' >Demo</p>
                                        <p className='text-black'>Hello ! Welcome to my Profile</p>
                                    </div>
                                    <div className="ml-[70px] gap-x-8 flex items-center ">
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'>+ Add</p>
                                        <p className='text-black-700  text-center text-[20px] font-bold bg-white px-4 py-2 rounded-full hover:bg-[black] hover:text-white'> Check profiles</p>
                                        <p className='text-[30px] font-bold text-white'> <BsThreeDotsVertical /></p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>




                </div>

            </div>
        </>
    )
}

export default Fnf