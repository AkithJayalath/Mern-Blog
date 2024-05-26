//import React from 'react'
import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  return (
    <div className='group relative w-full border border-teal-500   rounded-lg sm:w-[430px] '>
        <img
          src={ad.image}
          alt='post cover'
          className='h-[260px] w-full '
        />
     
    </div>
  );
}
