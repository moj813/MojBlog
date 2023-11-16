import React from 'react'
import Header from '../components/Header'
import Blogs from '../components/Blogs'
import Pagination from '../components/Pagination'
import { useNavigate } from 'react-router-dom'

const Categories = ({category}) => {

    const navigation = useNavigate();
  return (
    <>
    <Header />
    <div className='mt-[80px]'>
        <div className='w-11/12 max-w-2xl mx-auto flex gap-8 items-center'>
            <button 
            className='border py-1 px-4'
            onClick={()=>navigation(-1)}>
                Back
            </button>
        <h1 className='text-xs font-bold '>Blog of Category #{category}</h1>
        </div>
        <Blogs />
    </div>
    <Pagination />
    </>
  )
}

export default Categories