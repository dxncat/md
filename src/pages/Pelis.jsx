import React, { useState, useEffect, useContext } from 'react'
import { useTransition, animated } from '@react-spring/web';
import { TokenContext } from '../Context/TokenContext';

function Pelis() {

  const [pelis, setPelis] = useState([]);
  const [newPlan, setNewPlan] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [pelisR, setPelisR] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [randomPlan, setRandomPlan] = useState(null);
  const [isOpenN, setIsOpenN] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);
  const { token, id } = useContext(TokenContext);

  useEffect(() => {
    const fetchPelis = async () => {
      const response = await fetch('https://deply-md.onrender.com/peliculas');
      const data = await response.json();
      setPelis(data.map((peli) => {
        return (
          <li className="" key={peli.id} >
            <span className='font-bold uppercase'>{peli.nombre}</span>, propuesto por: <span className='text-customBlue'>{peli.usuario.usuario}</span>, estado: {peli.vista ? <span className='text-customGreen'>Vista</span> : <span className='text-customPink'>No vista</span>}
          </li>
        )
      }));

    }

    const fetchPelisN = async () => {
      const response = await fetch('https://deply-md.onrender.com/peliculas/no-vistas');
      const data = await response.json();
      setPelisR(data);
    }

    fetchPelisN();
    fetchPelis();
  }, []);

  const transitions = useTransition(showAll ? pelisR : [randomPlan], {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAll(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [pelis]);

  const handleAnimationStart = () => {
    const randomIndex = Math.floor(Math.random() * pelisR.length);
    setRandomPlan(pelisR[randomIndex]);
    setShowAll(false);
  };

  const submitNewPlan = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ nombre: newPlan, usuario_id: id }),
    };

    try {
      const response = await fetch('https://deply-md.onrender.com/peliculas/crear', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al crear plan');
      } else {
        window.location.reload();
      }
    } catch (error) {
      setMensajeError(error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewPlan();
  }

  return (
    <section className='m-8'>
      <h1 className='font-caveat font-bold text-customPink text-4xl mb-8'>Pelis propuestas:</h1>
      <article>
        <ul className="mb-8">
          {pelis}
        </ul>
      </article>
      <article className="flex flex-row justify-between mr-8">
        <button onClick={() => setIsOpenN(true)} className="bg-customGreen rounded-xl w-[30%] py-2">
          Nueva Peli
        </button>
        <button onClick={() => setIsOpenR(true)} className="bg-customGreen rounded-xl w-[30%] py-2">
          Peli Aleatoria
        </button>
      </article>
      {
        isOpenN && (
          <article className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <form className="flex flex-col p-4 rounded-xl bg-white w-60 h-60" onSubmit={handleSubmit}>
              <label>Nueva Peli</label>
              <input
                type="text"
                className="h-[3em] w-full mt-8 mb-8 border p-2"
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
              />
              <p className="text-red-500">{mensajeError}</p>
              <button className="bg-customGreen rounded-xl w-full py-5">Agregar</button>
            </form>
          </article>
        )
      }
      {
        isOpenR && (
          <article className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <section className="flex flex-col p-4 rounded-xl bg-white w-60 h-60 items-center">
              {transitions((style, item) => (
                item && (
                  <animated.div className="mb-16 mt-10 text-xl" style={style} key={item.id}>
                    <p>{item.nombre}</p>
                  </animated.div>
                )
              ))}
              <button className="bg-customGreen rounded-xl w-full py-5" onClick={handleAnimationStart}>Iniciar Animación</button>
            </section>
          </article>
        )
      }
    </section>
  )
}

export default Pelis