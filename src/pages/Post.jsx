import React, { useState, useEffect, useContext } from 'react';
import PreviewPost from '../components/PreviewPost';
import { TokenContext } from '../Context/TokenContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Post() {
  const [posts, setPosts] = useState([]);
  const { id } = useContext(TokenContext);

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('es-ES');
    const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  }

  const api = 'https://deply-md.onrender.com/posts';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setPosts(data.map(post => {
            const { formattedDate, formattedTime } = formatDateTime(post.fecha);
            return (
              <Link to={"/posts/" + post.id} key={post.id}>
                <PreviewPost
                  key={post.id}
                  title={post.titulo}
                  content={post.contenido}
                  image={post.usuario.pic}
                  author={post.usuario.usuario}
                  date={formattedDate}
                />
              </Link>
            );
          }));

        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los posts:, ' + api + " ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <article className='flex items-center justify-between m-8'>
        <p>Publica lo que piensas:</p>
        <Link to={"/new-post"}>
          <section className='flex items-center'>
            <p>Crea un Post</p>
            <button className='bg-customGreen rounded-full w-7 h-full text-xl ml-4'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </section>
        </Link>
      </article>

      <section>
        <h1 className='ml-8 text-xl'>Posts:</h1>
        {posts}
      </section>

      <Link to={"/my-posts/" + id} className='m-8'>
        <button className='bg-customGreen text-gray-800 py-2 px-8 rounded-xl text-xl'>
          Mis Posts
        </button>
      </Link>

    </div>
  );
}

export default Post;