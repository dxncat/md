import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Coments from '../components/Coments'
import NewComment from '../components/NewComment';

function PostInfo() {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [usuario, setUsuario] = useState({});
    const [comentarios, setComentarios] = useState([]);

    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('es-ES');
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return { formattedDate, formattedTime };
    }

    const fetchPost = async () => {
        const response = await fetch(`https://deply-md.onrender.com/posts/info/${id}`);
        const data = await response.json();
        setPost(data);
        setUsuario(data.usuario);
    }

    const fetchComments = async () => {
        const response = await fetch(`https://deply-md.onrender.com/comentarios/publicacion/${id}`);
        const data = await response.json();
        setComentarios(
            data.map((comment) => {
                const { formattedDate } = formatDateTime(comment.fecha);
                return (
                    <Coments
                        key={comment.id}
                        content={comment.contenido}
                        author={comment.usuario.usuario}
                        date={formattedDate}
                        image={comment.usuario.pic}
                    />
                )
            })
        );
    }

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id])

    const { formattedDate } = formatDateTime(post.fecha);

    return (
        <div className='m-12'>
            <section className='flex justify-between items-center'>
                <article className='flex items-center'>
                    <img className='w-20 rounded-full mr-8' src={usuario.pic} alt={usuario.usuario} />
                    <p className='text-3xl font-caveat font-bold' style={{ alignSelf: 'start' }}>{usuario.usuario}</p>
                </article>
                <article className='flex flex-col items-end'>
                    <p className='text-gray-600'>{formattedDate}</p>
                    <h1 className='font-semibold'>{post.titulo}</h1>
                </article>
            </section>
            <br />
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.contenido}</p>
            <br />
            <br />
            <section>
                <h2 className='font-semibold uppercase'>Comentarios:</h2>
                <article>
                    <NewComment idP={id} />
                </article>
                <article>
                    {comentarios}
                </article>
            </section>
        </div>
    )
}

export default PostInfo