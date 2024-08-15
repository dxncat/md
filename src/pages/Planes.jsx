import React, { useState, useEffect, useContext } from 'react'
import { useTransition, animated } from '@react-spring/web';
import { TokenContext } from '../Context/TokenContext';

function Planes() {

  const [planes, setPlanes] = useState([]);
  const [newPlan, setNewPlan] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [planesR, setPlanesR] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [randomPlan, setRandomPlan] = useState(null);
  const [isOpenN, setIsOpenN] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);
  const { token, id } = useContext(TokenContext);

  useEffect(() => {
    const fetchPlanes = async () => {
      const response = await fetch('https://deply-md.onrender.com/planes');
      const data = await response.json();
      setPlanes(data.map((plane) => {
        return (
          <li key={plane.id} >
            Plan: <span className='font-bold uppercase'>{plane.nombre}</span>, propuesto por: <span className='text-customBlue'>{plane.usuario.usuario}</span>
          </li>
        )
      }));
      setPlanesR(data);
    }
    fetchPlanes();
  }, []);

  const transitions = useTransition(showAll ? planesR : [randomPlan], {
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
  }, [planes]);

  const handleAnimationStart = () => {
    const randomIndex = Math.floor(Math.random() * planesR.length);
    setRandomPlan(planesR[randomIndex]);
    setShowAll(false);
  };

  const submitNewPlan = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ nombre: newPlan, usuario_id: id }),
    };

    try {
      const response = await fetch('https://deply-md.onrender.com/planes/crear', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al crear plan');
      }else{
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
      <h1 className='font-caveat font-bold text-customPink text-4xl mb-8'>Planes propuestos:</h1>
      <article>
        <ul className="mb-8">
          {planes}
        </ul>
      </article>
      <article className="flex flex-row justify-between mr-8">
        <button onClick={() => setIsOpenN(true)} className="bg-customGreen rounded-xl w-[30%] py-2">
          Nuevo Plan
        </button>
        <button onClick={() => setIsOpenR(true)} className="bg-customGreen rounded-xl w-[30%] py-2">
          Plan Aleatorio
        </button>
      </article>
      {
        isOpenN && (
          <article className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <form className="flex flex-col p-4 rounded-xl bg-white w-60 h-60" onSubmit={handleSubmit}>
              <label>Nuevo Plan</label>
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

export default Planes