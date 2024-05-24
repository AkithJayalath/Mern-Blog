//import React from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

export default function CreateAd() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUploadImage= async () =>{
        try{
            if(!file){
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =(snapshot.bytesTransferred/ snapshot.totalBytes)* 100;
                setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },

                () =>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL});
                    });
                }
            );
        }catch (error){
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create an ad</h1>
        <form className="">
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                    type='file' 
                    accept='image/*' 
                    required id='ad' 
                    onChange={(e)=>setFile(e.target.files[0])}
                />
                <Button 
                    type='button' 
                    className='hover:bg-gradient-to-r from-purple-500 to-blue-500 py-8 px-4 border-2 border-blue-500 text-black hover:text-white dark:text-white hover:border-transparent'  
                    size='sm'
                    onClick={handleUploadImage}
                    disabled={imageUploadProgress}
                >
                    {
                        imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar
                                value={imageUploadProgress}
                                text={`${imageUploadProgress || 0}%`}
                            />
                        </div>
                        ) : (
                            'Upload Image'
                        )
                    }
                </Button>
            </div>
            {imageUploadError && 
                <Alert className='bg-red-200 text-red-800'>
                    {imageUploadError}
                </Alert>
            }

            {formData.image && (
                <img
                    src={formData.image}
                    alt='upload'
                    className='w-full h-72 object-cover'
                />
            )}

        </form>
    </div>
  )
}
