import React, { useState } from 'react'
import smrbg from '../../assets/curtton.avif'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref, set} from "firebase/database";
import { motion } from 'framer-motion';



const Registration = () => {

  const db = getDatabase();

  
  const auth = getAuth();
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState('')

  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')

  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  const [showPassword, setShowPassword] = useState('')
  const [Success, setSuccess] = useState(' ')


  const handleName = (e) => {
    setName(e.target.value)
    setNameErr('')

  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailErr('')

  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordErr('')

  }


  const handleClick = () => {

    console.log('cooll')
    if (!name) {
      setNameErr('Please write your name')
    }
    if (!email) {
      setEmailErr('Please write email')
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr('Enter Correct Email')
      }
    }

    if (!password) {
      setPasswordErr('Please set Password')
    } else if (!/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      setPasswordErr('Password should be like 123456@Ab')
    }
    if (email && name && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user, 'sdddddddddddddd')
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: './src/assets/login.png'
          }).then(() => {
            sendEmailVerification(auth.currentUser)
            toast.success('Registration done. Verify email.')
            setName(' ')
            setEmail(' ')
            setPassword(' ')
            setTimeout(() => {
              navigate('/login')
            }, 3000);
          }).then (()=>{
            set(ref(db, 'users/' + user.user.uid),{
              username: user.user.displayName,
              email: user.user.email
            } )
          
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailErr('Email already in use')
          }
        });
    }

  }

  return (
    <div>
      <div className='flex'>
        <div className='w-1/2'>
          <img className='w-full h-screen object-cover' src={smrbg} alt="" />
        </div>

        <div className='w-1/2 items-center '>
          <motion.div 
                     initial={{
                      opacity: 0,
                      y: 100
                    }}
                    animate={{
                      opacity: 500,
                      y: 0,
                    }}
                    transition={{
                      delay: 1,
                      duration: 1,
      
                    }}
      
          className='mt-[55px]'>
            <h1 className='font-josef font-bold text-[55px] text-[#0317fc]'>H2O is now on the web!</h1>
            <p className='font-josef text-[30px] w-[70%] leading-9 text-[#0388fc]	'>Chat, Snap, and video call your friends from wherever you are.</p>
          </motion.div>

          {/* {
            regSuccess &&
            <p className='font-bold'>{regSuccess}</p>
          } */}

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />

          {/* form control */}
          <motion.div 
          
          initial={{
            opacity: 0,
            x: 100
          }}
          animate={{
            opacity: 500,
            x: 0,
          }}
          transition={{
            delay: 1,
            duration: 1,

          }}


          className='flex flex-col gap-y-[20px] mr-[100px] mt-8 shadow-13xl px-[30px] py-[25px] rounded-lg border w-[680px]'>

            <h3 className='font-semibold text-[18px]'> Please write your name</h3>
            <input onChange={handleName} value={name} className='border-2 border-indigo-600 rounded-lg px-3 py-4 bg-[transparent] ' type="text" placeholder='Enter your name' />
            {
              nameErr &&
              <p className='text-[red]'>{nameErr}</p>

            }

            <h3 className='font-semibold text-[18px]'> Please write your Email</h3>
            <input onChange={handleEmail} value={email} className='border-2 border-indigo-600 rounded-lg px-3 py-4 bg-[transparent]' type="Email" placeholder='Enter your Email' />
            {
              emailErr &&
              <p className='text-[red]'>{emailErr}</p>
            }
            <div className='relative'>

              <h3 className='font-semibold text-[18px] mb-3'> Please choose Passwword</h3>
              <input onChange={handlePassword} value={password} className='w-full border-2 border-indigo-600 rounded-lg px-3 py-4 bg-[transparent]' type={showPassword ? 'password' : 'text'} placeholder='Enter your Password' />
              {
                showPassword ?
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='absolute top-[60%] right-[40px]' />
                  :
                  <FaRegEye onClick={() => setShowPassword(!showPassword)} className='absolute top-[60%] right-[40px]' />

              }
            </div>

            {
              passwordErr &&
              <p className='text-[red]'>{passwordErr}</p>
            }
            <div>
              <div>
                <button onClick={handleClick} className='text-[22px] font-semibold w-full bg-[#e593fe] px-3 py-4 border rounded-lg '>
                  Registration now
                </button>
              </div>
              <div className='flex justify-around mt-5'>
                <div className=' '>
                  <div className='flex text-end'><h2 className=' font-semibold font-josef text-[20px]'>Check out log registration credential</h2></div>
                </div>
                <div>
                  <h2 className='font-josef text-[20px] font-bold text-[#0388fc] cursor-pointer'> <Link to='/login'>Sign in </Link> </h2>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

    </div>
  )
}

export default Registration