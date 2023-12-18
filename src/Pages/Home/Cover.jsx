import cover from '../../assets/cover3.avif'
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';

const Cover = () => {
    // const navigate = useNavigate()
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const [coverimgPop, setCoverimgPop] = useState(false)
    const auth = getAuth();



    const onChange = (e) => {
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
                    })
                        .then(() => {
                            // set(dbRef(db, 'profileimg/' + data.uid), {
                            //     img: downloadURL
                            // })
                            setCoverimgPop(false)
                            setImage('')
                            setCropData('')
                        })

                });
            });

        }
    };



    const handleCoverimageUpload = () => {
        setCoverimgPop(true)
    }

    const handleCancelUpload = () => {
        setCoverimgPop(false)
    }

    const coverUpload = () => {

    }

    return (
        <>
            <div className='flex mx-auto items-center mt h-[600px] w-[1000px] border-5 rounded-lg'>

                <div className='group relative mx-auto border-2 border-black rounded-lg h-[600px] w-[900px] '>
                    <img className='rounded-lg' src='cover' alt="" />
                    <div className=' absolute bg-[black] opacity-0 group-hover:opacity-70 ease-in duration-300 h-full w-full mx-auto absolute top-0 right-0 rounded-lg flex justify-center items-center text-center cursor-pointer'>
                        <FiUploadCloud onClick={handleCoverimageUpload} className='text-[white] text-[40px]' />
                    </div>
                </div>

                {/* modal  */}
                {
                    coverimgPop &&
                    <div className=''>
                        <div className="  bg-[purple] absolute top-0 left-0 w-full h-full">
                            <div className='mx-auto bg-white px-[50px] py-[70px] w-[900px] h-[750px] mt-9'>
                                <h1 className="font-bold text-[35px] ">Upload Image</h1>

                                <div className='rounded-lg h-[60px] w-[90px] '>
                                    <div className='img-preview'></div>
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

                           

                                <div className="mt-4">
                                    <input className='bg-[teal] text-[20px]' type="file" />
                                </div>
                                <div className="flex mt-5 gap-x-5">
                                    <button onClick={coverUpload} className='bg-[purple] text-[20px] px-[12px] text-white font-bold py-[8px] rounded-lg'>Upload</button>

                                    <button onClick={handleCancelUpload} className='bg-[black] text-[20px] px-[12px] text-white font-bold py-[8px] rounded-lg'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default Cover