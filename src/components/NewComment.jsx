import React, { useState, useContext } from 'react';
import { TokenContext } from '../Context/TokenContext';

function NewComment({ idP }) {
    const [contenido, setContenido] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [remainingChars, setRemainingChars] = useState(3000);
    const { token, id, pic } = useContext(TokenContext);

    const submitPost = async () => {

        const fechaActual = new Date().toISOString().split('T')[0];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(
                {
                    usuario_id: id,
                    post_id: idP,
                    contenido,
                    fecha: fechaActual
                }
            )
        };

        const response = await fetch('https://deply-md.onrender.com/comentarios/crear', requestOptions);

        if (!response.ok) {
            setMensajeError(data.detail)
        } else {
            window.location.reload();
        }
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setContenido(newText);
        setRemainingChars(3000 - newText.length);
    };

    return (
        <div className='p-8 items-center grid grid-cols-12 mb-5'>
            <div className='col-span-2' style={{ alignSelf: 'start' }}>
                <img className='rounded-full w-14 md:w-24' src={pic} alt='Usuario' />
            </div>
            <form className='w-full col-span-10 ml-4 md:-ml-0 lg:-ml-18' onSubmit={submitPost}>
                <textarea
                    placeholder='Escribe un comentario'
                    className='w-full h-32 p-2 border rounded border-gray-600'
                    value={contenido}
                    onChange={handleTextChange}
                    maxLength={3000}
                ></textarea>
                <p className='text-right mt-2'>{remainingChars} caracteres restantes</p>
                <p className='text-red-500'>{mensajeError}</p>
                <button
                    type='submit'
                    className='bg-customBlue text-black p-2 rounded mt-2'
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default NewComment