import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import React from 'react'


export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
            Create a post
        </h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                    type='text'
                    placeholder='Title required' 
                    required id='title' 
                    className='flex-1'
                />
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' />
                <Button type='button' className='hover:bg-gradient-to-r from-purple-500 to-blue-500 py-8 px-4 border-2 border-blue-500 text-black hover:text-white dark:text-white hover:border-transparent'  size='sm'>
                    Upload image
                </Button>
            </div>
           <ReactQuill 
                theme='snow' 
                placeholder='Write something...' 
                className='h-72 mb-12'
                required
            />
           <Button type='submit'className='hover:bg-gradient-to-r from-purple-500 to-pink-500 bg-pink-500'>
            Publish
           </Button>
        </form>
    </div>
  )
}
