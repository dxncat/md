import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <section className='h-[90vh] grid grid-cols-1 md:grid-cols-8'>
            <div className='md:col-span-5 flex items-center justify-center p-8'>
                <div className='flex flex-col gap-8'>
                    <h1 className='text-7xl font-bold'>Bienvenida a <span className="text-customPink p-2 font-caveat">NUESTRO</span> espacio <span className="text-customBlue p- font-caveat">SEGURO</span></h1>

                    <p className='text-gray-500 text-2xl leading-[2.5 rem]'>Aquí podremos decidir sobre los planes cuando no tengamos idea de que hacer, hacer cartitas o notas para el otro cuando se nos dificulte hablarlo, reseñas pelis que veamos, entre otras cosillas más.</p>

                    <div className='flex items-center gap-4'>
                        <button className='bg-customGreen text-gray-800 py-2 px-8 rounded-xl text-xl'>
                            <Link to={"/new-post"}>
                                Haz un Post
                            </Link>
                        </button>

                        <button className='flex items-center gap-4 py-2 px-8 rounded-xl text-xl'>
                            <Link to={"/peliculas"} className='flex items-center gap-4 py-2 px-8 rounded-xl text-xl'>
                                <FontAwesomeIcon icon={faPlay} className='bg-[#F8EEFD] text-customViolet rounded-full p-4 box-content w-5' />
                                Elijamos una peli</Link>
                        </button>

                    </div>
                </div>
            </div>
            <div className='md:col-span-3'>
                <img src="/home.png" alt="" />
            </div>
        </section>
    )
}

export default Home