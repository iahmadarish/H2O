import React, { createRef, useState } from 'react'
import cover from '../../assets/cover3.avif'
import { BiSolidCloudUpload } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { userLoginInfo } from '../../Slices/userSlice';
import {ref as dbRef, set, getDatabase} from 'firebase/database' 




const Rightprofile = () => {
    const db = getDatabase()
    const data = useSelector(state => state.userLoginInfo.userInfo)
    // const dispatch = useDispatch()
    const storage = getStorage();
    const auth = getAuth();
    const [image, setImage] = useState();
    const [coverimgPopUp, setCoverimgPopUp] = useState(false)
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();


    const coverimgChange = (e, user) => {
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
        setCoverimgPopUp(true)
        // dispatch(userLoginInfo(user))
        localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user)))
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
                        set(dbRef(db, 'coverimg/'+ data.uid),{
                            img2: downloadURL
                        })
                        setCoverimgPopUp(false)
                        setImage('')
                        setCropData('')
                    })

                });
            });
        }
    };


    const handdleImgUpload = () => {
        setCoverimgPopUp(true)
    }


    const cancelupload = () => {
        setCoverimgPopUp(false)
    }



    return (
        <div className='bg-[#dce305] pb-[180px]'>
            <div className='group relative border-5 border text-center py-[px] '>
                <img className='rounded-lg' src={data.photoURL} alt="" />
                <div className='bg-[black]] opacity-100 group-hover:opacity-100 rounded-full w-full h-full absolute top-[-40%] left-[10%] flex justify-center items-center '>
                    <BiSolidCloudUpload onClick={handdleImgUpload} className='cursor-pointer text-[yellow] text-[45px]' />
                </div>
            </div>
            {
                coverimgPopUp &&
                <div className='p-[150px] h-screen bg-[purple] absolute top-0 right-0 w-full z-[11111]'>
                    <div className='items-center p-10 bg-white border-black rounded-lg'>
                        <h1 className=' text-center font-josef font-bold text-[35px]'>Upload your image</h1>


                        <div className=' mx-auto border-2 border-black rounded-lg h-[280px] w-[400px] mb-6 overflow-hidden'>
                            <div className='img-preview rounded-lg h-full w-full ' />
                        </div>

                        {
                            image &&
                            <Cropper
                                ref={cropperRef}
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
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

                        <input onChange={coverimgChange} type="file" placeholder='choose file' className='bg-[#dce305]' /> <br /><br />
                        <div className='flex gap-x-10'>
                            <button onClick={getCropData} className='bg-[teal] px-[15px] py-[10px] text-white text-[30px] font-bold border-black rounded-lg border-2 '>Upload </button>
                            <button onClick={cancelupload} className='bg-[black] px-[15px] py-[10px] text-white text-[30px] font-bold border-black rounded-lg border-2 '> Cancel  </button>
                        </div>


                    </div>
                </div>
            }
        </div>
    )
}

export default Rightprofile