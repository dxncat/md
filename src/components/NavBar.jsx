import React, { useState, useContext } from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faArrowRightToBracket, faTimes, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { TokenContext } from '../Context/TokenContext'

function NavBar() {

  const [click, setClick] = useState(false)
  const navigate = useNavigate();
  const { pic } = useContext(TokenContext)

  const handleClick = () => setClick(!click)


  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthenticated')
    window.location.reload()
  }

  const content =
    <section className='lg:hidden block absolute top-16 w-full left-0 right-0 inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
      <ul className='text-center text-xl p-20 text-white'>
        <LinkRouter to={"/"}>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-customYellow hover:rounded hover:text-black' onClick={() => setClick(false)}>Inicio</li>
        </LinkRouter>
        <LinkRouter to={"/posts"}>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-customYellow hover:rounded hover:text-black' onClick={() => setClick(false)}>Posts</li>
        </LinkRouter>
        <LinkRouter to={"/planes"}>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-customYellow hover:rounded hover:text-black' onClick={() => setClick(false)}>Planes</li>
        </LinkRouter>
        <LinkRouter to={"/peliculas"}>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-customYellow hover:rounded hover:text-black' onClick={() => setClick(false)}>Peliculas</li>
        </LinkRouter>
        {pic && <button onClick={logOut}><li className='my-4 py-4 border-b border-slate-800 hover:bg-customYellow hover:rounded '>Cerrar Sesión</li></button>}
      </ul>
    </section>

  return (
    <nav className='bg-customBlue'>
      <div className='h-10vh flex justify-between z-50 text-slate-800 lg:py-5 px-20 py-4 flex-1'>
        <div className='flex items-center flex-1'>
          <LinkRouter to={"/"} ><span className='text-3xl font-caveat font-bold'>M&D</span></LinkRouter>
        </div>
        <div className='lg:flex md:flex lg: flex-1 items center justify-end hidden font-sans'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px] items-center'>

              <LinkRouter to={"/"}>
                <li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'>Inicio</li>
              </LinkRouter>

              <LinkRouter to={"/posts"}>
                <li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'>Posts</li>
              </LinkRouter>

              <LinkRouter to={"/planes"}>
                <li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'>Planes</li>
              </LinkRouter>

              <LinkRouter to={"/peliculas"}>
                <li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'>Peliculas</li>
              </LinkRouter>

              {pic && <div><img src={pic} alt={pic} className='w-12 h-12 rounded-full' /></div>}

              {!pic ? <LinkRouter to={"/login"}><li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'><FontAwesomeIcon icon={faArrowRightToBracket} /></li></LinkRouter> : <button onClick={logOut}><li className='hover:text-fuchsia-600 transition border-b-2 border-customViolet hover:border-fuchsia-600 cursor-pointer'><FontAwesomeIcon icon={faArrowRightFromBracket} /></li></button>}

            </ul>
          </div>
        </div>
        <div>
          {click && content}
        </div>
        <button className='block sm:hidden transition' onClick={handleClick}>
          {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>
    </nav>
  )
}

export default NavBar