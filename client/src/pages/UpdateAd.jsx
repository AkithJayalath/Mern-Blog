//import React from 'react'
import { Alert, Button, FileInput} from 'flowbite-react'
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UpdateAd() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const {adId} = useParams();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() =>{
        try{
            const fetchAd = async () => {
                const res = await fetch(`/api/ad/getads?adId=${adId}`);
                const data = await res.json();
                console.log('Fetched ad data:', data);
                if (!res.ok) {
                  console.log(data.message);
                  setPublishError(data.message);
                  return;
                }
                if (res.ok) {
                  setPublishError(null);
                  console.log('Setting formData:', data.ads[0]);
                  setFormData(data.ads[0]);
                }
              };
        
              fetchAd();
        }catch (error){
            console.log(error.message);
        }

    }, [adId]);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting formData:", formData);
        console.log(`Sending request to: /api/ad/updatead/${formData._id}/${currentUser._id}`); 
        try {
          const res = await fetch(`/api/ad/updatead/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            
          });
          
          const data = await res.json();
          console.log('Update response:', data);
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/ad/${data.adSlug}`);
          }
        } catch (error) {
            console.error('Error:', error.message);
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update ad</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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

            <Button type='submit'className='hover:bg-gradient-to-r from-purple-500 to-pink-500 bg-pink-500'>
            Update ad
            </Button>
          
            {publishError && (
                <Alert className='bg-red-200 text-red-800 mt-5'>
                {publishError}
                </Alert>
           ) }

        </form>
    </div>
  )
}
