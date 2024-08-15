import React from 'react';

function PreviewPost({ title, content, image, author, date, time }) {

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + ' ...';
        }
        return text;
    }

    return (
        <div className='p-8 border-gray-600 items-center grid grid-cols-12 border-2 rounded-xl m-5'>
            <div className='col-span-2'>
                <img className='rounded-full w-14 md:w-24' src={image} alt={title} />
            </div>
            <div className='col-span-10 h-full w-full ml-4 md:-ml-4 lg:-ml-12'>
                <div className='flex w-full justify-between'>
                    <h2 className=''>{truncateText(title, 20)} - {author}</h2>
                    <p className='text-gray-600 justify-end'>{date}</p>
                </div>
                <p className='mt-6'>{truncateText(content, 200)}</p>
            </div>
        </div>
    );
}

export default PreviewPost;