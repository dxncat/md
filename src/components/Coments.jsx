import React from 'react'

function Coments({ content, image, author, date }) {

    return (
        <div className='p-8 border-gray-600 items-center grid grid-cols-12 border-2 rounded-xl mb-5'>
            <div className='col-span-2' style={{ alignSelf: 'start' }}>
                <img className='rounded-full w-14 md:w-24' src={image} alt={author} />
            </div>
            <div className='col-span-10 h-full w-full ml-4 md:-ml-0 lg:-ml-18'>
                <div className='flex w-full justify-between'>
                    <h2 className='font-caveat font-semibold'>{author}</h2>
                    <p className='text-gray-600 justify-end'>{date}</p>
                </div>
                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }} className='mt-6'>{content}</p>
            </div>
        </div>
    );
}

export default Coments