import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbBrandStorybook } from "react-icons/tb";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { TiMediaFastForwardOutline } from "react-icons/ti";
import { FaFaceSmileWink } from "react-icons/fa6";
import home from '../../assets/snapchat.png'
import { motion } from "framer-motion"

const Home = () => {



  const navigate = useNavigate()


  const registeraccount = () => {
    setTimeout(() => {
      navigate('/reg')
    }, 3000);
  }



  return (
    <div>


      <div className='  w-full bg-[#dce305] px-[70px] py-[50px] '>

        <div className='flex justify-between px-[70px]'>
          <div>
            <h1 className='font-josef font-bold text-[55px] text-[black] flex' >H2<FaFaceSmileWink className='text-[55px]' />
            </h1>
          </div>
          <div className='flex gap-x-[100px]'>
            <p className='font-bold font-josef text-[22px] text-[black] flex'> <TbBrandStorybook className='text-[30px] mr-[5px]' /> Story </p>
            <p className='font-bold font-josef text-[22px] text-[black] flex'> <BiSolidMessageSquareDots className='text-[30px] mr-[5px]' /> Message </p>
            <p className='font-bold font-josef text-[22px] text-[black] flex'> <TiMediaFastForwardOutline className='text-[30px] mr-[8px] ' /> Real </p>
          </div>

        </div>

        <div className='flex  px-[70px] '>


          <div className='w-1/2'>

            <div className="mt-[110px] ">
              {/* <h2 className='text-[black] text-[55px] w-[80%] leading-[55px] font-josef font-bold	mb-10 mt-'>Welcome to your professional community</h2> */}

              <motion.p
                initial={{
                  opacity: 0,
                  x: 1000
                }}
                animate={{
                  opacity: 500,
                  x: 0,
                }}
                transition={{
                  delay: 1,
                  duration: 1,

                }}

                className='text-[black] text-[65px] w-[85%] leading-[65px] font-josef font-bold	mb-10 mt-'
              >
                Welcome to your professional community
              </motion.p>



              <motion.p
                initial={{
                  opacity: 0,
                  x: 1000
                }}
                animate={{
                  opacity: 500,
                  x: 0,
                }}
                transition={{
                  delay: 1.5,
                  duration: 1,

                }}

                className='text-[30px] font-josef text-[black] w-[50%] mt-5'> Find the right person or Friend for you</motion.p>
              <motion.div
                         initial={{
                          opacity: 0,
                          x: 1000
                        }}
                        animate={{
                          opacity: 500,
                          x: 0,
                        }}
                        transition={{
                          delay: 2,
                          duration: 1,
          
                        }}
          
              
              className=''>
                <button onClick={registeraccount} className='bg-[black] hover:bg-[#7c038a] font-josef font-bold text-[white] text-[20px] border-2 px-[20px] py-[10px] rounded-full mt-5'> Create Account </button>
              </motion.div>
            </div>
          </div>


          <div className='w-1/2 relative'>
            <div className="">
              <img src={home} alt="" />
            </div>
            {/* 
            <div className='absolute bottom-[0px] right-0 flex gap-x-[20px]'>
            <h3 className='text-[25px] font-bold font-josef text-[purple] w-[70%]'>Connect with people who can guide you to catch up your desire goal.</h3>
            </div> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home