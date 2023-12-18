import React, { useState } from 'react'
import login from '../../assets/login2.png'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../Slices/userSlice';
import { motion } from 'framer-motion';



const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')

  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  const [showPassword, setShowPassword] = useState('')

  const [loginerr, setLoginerr] = useState('')

  const dispatch = useDispatch()



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

    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(userLoginInfo(user.user))
          localStorage.setItem('userLoginInfo', JSON.stringify( userLoginInfo(user.user)))
          setLoginerr('')
          setEmail('')
          setPassword('')
          toast.success('log in done')
          setTimeout(() => {
            navigate('/profile')
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          setLoginerr(errorCode.includes('auth/invalid-credential'))
        });

    }

  }


  const googlesign = () => {
    console.log('first')
    signInWithPopup(auth, provider)
      .then(() => {
      setTimeout(() => {
        navigate('/profile')
      }, 3000);
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
      });


  }



  return (
    <div>
      <div className='flex'>
        <div className='w-1/2'>
          <img className='w-full h-screen object-cover' src={login} alt="" />
        </div>

        <div className='w-1/2 items-center ml-[100px]'>
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
      
          className='mt-[55px]'>
            <h1 className='font-josef font-bold text-[55px] text-[#0317fc]'> Please Log in and Explore. </h1>
            <p className='font-josef text-[30px] w-[70%] leading-9 text-[#0388fc]	'> H2O is help you out express and impress each!.</p>
          </motion.div>

          <br /><br />
          <div onClick={googlesign} className='flex gap-2 border-[3px] w-[250px] px-3 py-4 rounded-lg cursor-pointer'>
            <FaGoogle className='font-bold text-[orange] text-[25px]' />
            <h1 className='font-josef text-[20px] text-[black]'> Log in with Google </h1>
          </div>

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
            theme="dark"
          />
          <ToastContainer />


          {
            loginerr &&
            <p className=' font-semibold text-[20px] text-[red] mt-3'>Please log in with Registered email and password</p>
          }



          {/* form control */}
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
          className='flex flex-col gap-y-[20px] mr-[100px] mt-8 shadow-13xl px-[30px] py-[25px] rounded-lg border w-[680px]'>


            <h3 className='font-semibold text-[18px]'> Email Please</h3>
            <input onChange={handleEmail} value={email} className='border-2 border-indigo-600 rounded-lg px-3 py-4 bg-[transparent]' type="Email" placeholder='Enter your Email' />
            {
              emailErr &&
              <p className='text-[red]'>{emailErr}</p>
            }
            <div className='relative'>

              <h3 className='font-semibold text-[18px] mb-3'> Passwword Please</h3>
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
                  Log in Explore
                </button>
              </div>
              <div className='flex justify-around mt-5'>
                <div className=' '>
                  <div className='flex text-end'><h2 className=' font-semibold font-josef text-[20px]'> Don't have account ? Please click </h2></div>
                </div>
                <div>
                  <p className='font-josef text-[20px] font-bold text-[#0388fc] cursor-pointer'>
                    <Link to='/reg'>Sign up </Link>
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
      
      {/* <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-full bg-[teal] px-[70px] pt-[150px] pb-[100px] '>
        <div className='w-1/2'>
          <h2 className='text-[white] text-[55px] w-[60%] leading-[55px] font-josef font-bold	'>Welcome to your professional community</h2>
          <p className='text-[30px] font-josef text-[white] w-[50%] mt-8'> Find the right person or Friend for you</p>
        </div>
        <div className='w-1/2 justify-center items-center'>
          <h3 className='text-[30px] font-josef text-[white] w-[50%]'>Connect with people who can guide you to catch up your desire goal</h3>

        <div className='flex gap-x-[20px]'>
        <div className='mt-5'>
            <button className='bg-sky-500 hover:bg-sky-700 font-josef font-bold text-[black] text-[28px] border-2 px-[35px] py-[25px] rounded-full'> Create Account </button>
          </div>
          <div className='mt-5'>
            <button className='bg-sky-500 hover:bg-[#d15bde] transition duration-5000 ease-in hover:ease-out  font-josef font-bold text-[black] text-[28px] border-2 px-[35px] py-[25px] rounded-full'> Login with existing account </button>
          </div>
        </div>
        </div>
      </div> */}

    </div>
  )
}

export default Login