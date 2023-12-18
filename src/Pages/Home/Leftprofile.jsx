import React, { createRef, useState } from 'react'
import profile from '../../assets/profilepic.jpg'
import { FiUploadCloud } from "react-icons/fi";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import bdflag from '../../assets/bdflag.png'
// import { ref as dbRef, set, getDatabase, onValue } from 'firebase/database'
import { userLoginInfo } from '../../Slices/userSlice';




const Leftprofile = () => {
    // const [pimage, setPimage] = useState([])
    // const db = getDatabase()
    // const dispatch = useDispatch()
    const data = useSelector(state => state.userLoginInfo.userInfo)
    console.log(data, 'hellllllllllll');
    const storage = getStorage();
    const auth = getAuth();
    const [images, setImages] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const [imgPopUp, setImgPopUp] = useState(false)

    const imgChange = (e, user) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImages(reader.result);
        };
        reader.readAsDataURL(files[0]);
        setImgPopUp(true)
        // dispatch(userLoginInfo(user))
        localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user)))

    };

    const newgetCropData = () => {
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
                    })
                        .then(() => {
                            // set(dbRef(db, 'profileimg/' + data.uid), {
                            //     img: downloadURL
                            // })
                            setImgPopUp(false)
                            setImages('')
                            setCropData('')
                        })

                });
            });
        }
    };

    // useEffect(() => {
    //     const proimg = dbRef(db, 'profileimg')
    //     onValue(proimg, (img) => {
    //         let arr = []
    //         img.forEach((data) => {
    //             arr.push(data.val().img)
    //         })
    //         setPimage(arr)
    //     })
    // })


    const handdleImgUpload = () => {
        setImgPopUp(true)
    }

    const cancelupload = () => {
        setImgPopUp(false)
    }

    return (
        <div className='bg-[] w-full pb-[50px] '>

            <div className=' '>


                <div className='group relative mx-auto border-2 border-black rounded-full h-[200px] w-[200px] '>
                    <img className='rounded-full' src={data.photoURL} alt="" />
                    <div onClick={handdleImgUpload} className=' absolute bg-[black] opacity-0 group-hover:opacity-20 ease-in duration-300 h-full w-full mx-auto absolute top-0 right-0 rounded-full flex justify-center items-center text-center cursor-pointer'>
                        <FiUploadCloud className='text-[white] text-[40px]' />
                    </div>
                </div>


                <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> {data.displayName} </p>
                <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> Hello users! Assalamu Alaikum ! </p>
                <p className='mt-[20px] text-[23px] text-[black] font-bold font-josef'> I am Student of MERN at CIT</p>
                <h3 className=''>
                    <p className="flex gap-x-3 mt-3 font-josef text-[23px] font-bold text-[purple]">  Edit bio <FaRegEdit />
                    </p>

                </h3>

                {/* profile timeline item */}
                <div className=' flex mt-5 gap-x-12'>
                    <p className="font-bold text-[20px]">Photos <FaImages className='text-[black] text-[45px] mt-1' />
                    </p>
                    <p className="font-bold text-[20px]"> Live <MdLiveTv className='text-[black] text-[45px] mt-1' />
                     </p>
                    <p className="font-bold text-[20px]"> Event
                    <img className='h-[65px] w-[65px]' src={bdflag} alt="" />
                    </p>
                </div>

            </div>

            {
                imgPopUp &&
                <div className='p-[150px] h-screen bg-[purple] absolute top-0 left-o w-full z-[11111]'>
                    <div className='items-center p-10 bg-white border-black rounded-lg'>
                        <h1 className=' text-center font-josef font-bold text-[35px]'>Upload your image</h1>


                        <div className=' mx-auto border-2 border-black rounded-full h-[200px] w-[200px] mb-6 overflow-hidden'>
                            <div className='img-preview rounded-full h-full w-full ' />
                        </div>

                        {
                            images &&
                            <Cropper
                                ref={cropperRef}
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={images}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                guides={true}
                            />
                        }

                        <input onChange={imgChange} type="file" placeholder='choose file' className='bg-[#dce305]' /> <br /><br />
                        <div className='flex gap-x-10'>
                            <button onClick={newgetCropData} className='bg-[teal] px-[15px] py-[10px] text-white text-[30px] font-bold border-black rounded-lg border-2 '>Upload </button>
                            <button onClick={cancelupload} className='bg-[black] px-[15px] py-[10px] text-white text-[30px] font-bold border-black rounded-lg border-2 '> Cancel  </button>
                        </div>


                    </div>
                </div>
            }

        </div>
    )
}

export default Leftprofile