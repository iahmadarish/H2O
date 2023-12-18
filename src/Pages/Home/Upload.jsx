import React, { createRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbBrandStorybook } from "react-icons/tb";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { TiMediaFastForwardOutline } from "react-icons/ti";
import { FaFaceSmileWink } from "react-icons/fa6";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import profile from '../../assets/profilepic.jpg'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import profile from '../../assets/profilepic.jpg'




const Upload = () => {
    const auth = getAuth();
    const storage = getStorage();
    const navigate = useNavigate()
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const data = useSelector(state => state.userLoginInfo.userInfo.photoURL)
    const [imgPopUp, setImgPopUp] = useState(false)
    const [verify, setVerify] = useState(false)


    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    }, [])

    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
            setVerify(true)

        }
    });


    const handleImageUpload = () => {
        console.log('first')
    }


    const imgChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const storageRef = ref(storage, auth.currentUser.uid);

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    }).then(() => {
                        setImage('')
                        setCropData('')
                        setTimeout(() => {
                            navigate('/profile')
                        }, 100);
                    })
                })
            });

        }
    };


    return (
        <div>

            <div>
                {
                    verify ?

                        <div className='bg-[#dce305] w-full pt-[70px] pb-[120px] '>
                            {/* navbar  */}
                            <div className='flex justify-between px-[70px] py-8'>
                                <div>
                                    <h1 className='font-josef font-bold text-[55px] text-[black] flex' >H2<FaFaceSmileWink className='text-[55px]' />
                                    </h1>
                                </div>
                                <div className='flex gap-x-[100px]'>
                                    <p className='font-bold font-josef text-[32px] text-[black] flex'> <TbBrandStorybook className='text-[39px] mr-[5px]' /> Story </p>
                                    <p className='font-bold font-josef text-[32px] text-[black] flex'> <BiSolidMessageSquareDots className='text-[39px] mr-[5px]' /> Message </p>
                                    <p className='font-bold font-josef text-[32px] text-[black] flex'> <TiMediaFastForwardOutline className='text-[39px] mr-[8px] ' /> Real </p>
                                </div>

                            </div>
                            {/* cover image and profile  */}
                            <div className='flex'>
                                <div className='w-3/4 group relative text-center px-[70px] py-[px] '>
                                    <img className='border-4 border-[black]-600 rounded-lg' src={cover} alt="" />
                                    <div className='bg-[black]] opacity-100 group-hover:opacity-100 rounded-full w-full h-full absolute top-[-40%] left-[10%] flex justify-center items-center '>
                                        <BiSolidCloudUpload className='cursor-pointer text-[yellow] text-[45px]' />
                                    </div>
                                </div>

                                <div className='w-1/4 '>
                                    <div className='group relative mx-auto border-2 border-black rounded-full h-[200px] w-[200px] '>
                                        <img className='rounded-full' src={profile} alt="" />
                                        <div onClick={handleImageUpload} className=' absolute bg-[black] opacity-0 group-hover:opacity-100 ease-in duration-300 h-full w-full mx-auto absolute top-0 right-0 rounded-full flex justify-center items-center text-center cursor-pointer'>
                                            <FiUploadCloud className='text-[white] text-[40px]' />
                                        </div>
                                    </div>
                                    <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> Name:  {data.displayName}</p>
                                    <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> Hello this is ishaq </p>
                                    <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> Student of MERN at CIT</p>

                                </div>

                            </div>

                            {/* upload modul  */}


                        </div>
                        :
                        <div className='bg-[#dce305] items-center text-center w-full h-screen px-[100px] pt-[200px] '>
                            <h1 className='text-center text-[40px] text-[black] font-bold font-josef '>
                                Please verify your email
                            </h1>
                            <button className='px-[50px] py-8 bg-[black] text-[white] font-bold text-[20px] font-josef border-2 rounded-full'><Link to='/login'> Back to log in </Link></button>
                        </div>
                }

            </div>

            </div>
            )
}

            export default Upload