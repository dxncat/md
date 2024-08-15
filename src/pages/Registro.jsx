import React, { useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContext'
import { useNavigate, Link } from 'react-router-dom'

function Registro() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('')
    const [mensajeError, setMensajeError] = useState('')
    const { setToken } = useContext(TokenContext)
    const navigate = useNavigate()

    const submitRegistro = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: username,
                contrasena: password,
                pic: pic
            })
        }

        const response = await fetch('https://deply-md.onrender.com/usuarios/registro', requestOptions)
        const data = await response.json()

        if (!response.ok) {
            setMensajeError(data.detail)
        } else {
            setToken(data.access_token)
            navigate('/')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            submitRegistro()
        } else {
            setMensajeError('Las contraseñas no coinciden')
        }
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 h-screen w-full bg-gray-100'>

            {/* Contenedor de imagen */}

            <div className='hidden md:block'>
                <img className='w-full h-full object-cover' src="./Login.png" alt="imagen" />
            </div>

            {/* Contenedor de formulario */}

            <div className=' flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={handleSubmit}>
                    <h2 className='font-caveat text-4xl font-bold text-center py-6'>M&D</h2>
                    <div className='flex flex-col py-2'>
                        <label>Usuario</label>
                        <input
                            className='border p-2'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Pic</label>
                        <input
                            className='border p-2'
                            type="text"
                            value={pic}
                            onChange={(e) => setPic(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Contraseña</label>
                        <input
                            className='border p-2'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Confirma Contraseña</label>
                        <input
                            className='border p-2'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <p className='text-red-500'>{mensajeError}</p>
                    <button className='border w-full my-5 py-5 bg-customGreen hover:bg-customYellow rounded-xl'>Crear Cuenta</button>
                    <div className='flex justify-between'>
                        <p>Te amo mucho mi princesa</p>
                        <Link to={"/login"}><p>Inicia Sesión</p></Link>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default Registro