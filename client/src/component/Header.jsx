import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon} from 'react-icons/fa';
//import React from 'react'

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link
            to='/' 
            className='self-center whitespace-nowrap text-sm sm:text-xl 
            font-semibold dark:text-white'
        >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
            via-purple-500 to-pink-500 rounded-lg text-white'>
             Sahand's
             </span>
            Blog
        </Link>
        <form >
           <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='items-center justify-center hidden lg:inline'
           />     
       </form>
       <Button className='w-12 h-10 lg:hidden'  color='gray'>
        <AiOutlineSearch />
       </Button>
       <div className="flex gap-2 items-center justify-center md:order-2">
        <Button className='w-10 h-10 flex items-center justify-center self-center' color='gray' >
            <FaMoon />
        </Button>
        <Link to='/sign-in'>
           <Button className='self-center whitespace-nowrap text-sm sm:text-xl 
             dark:text-white px-2 py-1 bg-gradient-to-r from-purple-500
             to-blue-500 rounded-lg text-white'>
            Sign In</Button>
        </Link>
        <Navbar.Toggle aria-label="Toggle navigation" aria-expanded={false} />
       </div>
       <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'}>
                <Link to='/' >
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to='/projects'>
                    Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}
