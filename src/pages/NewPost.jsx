import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContext';

function NewPost() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const { id, token } = useContext(TokenContext);
    const navigate = useNavigate()

    const [text, setText] = useState('');
    const [remainingChars, setRemainingChars] = useState(3000);


    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setRemainingChars(3000 - newText.length);
    };

    const submitPost = async () => {

        const fechaActual = new Date().toISOString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(
                {
                    usuario_id: id,
                    titulo,
                    contenido,
                    fecha: fechaActual
                }
            )
        };

        const response = await fetch('https://deply-md.onrender.com/posts/crear', requestOptions);

        if (!response.ok) {
            setMensajeError(data.detail)
        } else {
            navigate('/posts')
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (titulo.trim() === '' || contenido.trim() === '') {
            setMensajeError('Todos los campos son obligatorios');
            return;
        }
        submitPost();

    }

    return (
        <section className='grid grid-cols-1 w-full'>

            {/* Contenedor de formulario */}

            <div className=' flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4 mt-3.5' onSubmit={handleSubmit}>
                    <h2 className='font-caveat text-4xl font-bold text-center py-6'>M&D</h2>
                    <div className='flex flex-col py-2'>
                        <label>Titulo</label>
                        <input
                            className='border p-2'
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Contenido</label>
                        <textarea
                            className='border p-2 h-60'
                            value={contenido}
                            onChange={(e) => {
                                setContenido(e.target.value);
                                handleTextChange(e);
                            }}
                            maxLength={3000}
                        />
                        <p className='text-right mt-2'>{remainingChars} caracteres restantes</p>
                    </div>
                    <p className='text-red-500'>{mensajeError}</p>
                    <button className='border w-full my-5 py-5 bg-customGreen hover:bg-customYellow rounded-xl'>Publicar</button>
                </form>
            </div>

        </section>
    )
}

export default NewPost