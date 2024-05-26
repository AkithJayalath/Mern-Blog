//import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';



export default function DashAds() {
    const {currentUser} = useSelector((state) => state.user);
    const [userAds,setUserAds] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [adIdToDelete, setAdIdToDelete] = useState('');
    
    useEffect(() => {
        const fetchAds =async () => {
          try{
            const res = await fetch(`api/ad/getads?userId=${currentUser._id}`);
            const data = await res.json();
            if(res.ok){
                setUserAds(data.ads);
                if(data.ads.length < 9){
                    setShowMore(false);
                }
            }
            
          } catch(error){
            console.log(error.message);
          } 
        };
        if(currentUser.isAdmin){
            fetchAds();
        }

    }, [currentUser._id]);


    const handleShowMore = async () => {
        const startIndex = userAds.length;
        try {
          const res = await fetch(
            `/api/ad/getads?userId=${currentUser._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserAds((prev) => [...prev, ...data.ads]);
            if (data.ads.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      const handleDeleteAd = async () =>{
        setShowModal(false);
        try {
          const res = await fetch(
            `/api/ad/deletead/${adIdToDelete}/${currentUser._id}`,
            {
              method: 'DELETE',
            }
          );
          
          if (res.ok) {
            setUserAds((prev) =>
                prev.filter((ad) => ad._id !== adIdToDelete)
              );
           
          } else {
            const data = await res.json();
            console.log(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className='table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 full-width'>
      {currentUser.isAdmin && userAds.length > 0 ? (
        <>
        <Table hoverable className='shadow-md '>
        <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Ad updated</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userAds.map((ad) =>(
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                <Table.Cell >{new Date(ad.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/ad/${ad.adSlug}`}>
                    <img 
                      src={ad.image}
                      className='w-20 h-10 object-cover bg-gray-500'
                      />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span 
                    onClick={() =>{
                      setShowModal(true);
                      setAdIdToDelete(ad._id);
                    }}
                  className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-ad/${ad._id}`}>
                    <span>
                    Edit
                  </span>
                  </Link>
                  
                </Table.Cell>
              </Table.Row>

            </Table.Body>
          ))}

        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )
        }

        </>
      ):(
        <p> You have no ads yet! </p>
      )}
        <Modal show={showModal} 
             onClose={()=> setShowModal(false)}
             popup
             size='sm'
      >
        <Modal.Header />
          <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this ad?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button className='bg-red-500 py-1 px-3 ' onClick={handleDeleteAd}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' className='py-1 px-3 ' onClick={()=> setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
