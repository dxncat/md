import React, { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [pic, setPic] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }
            const response = await fetch('https://deply-md.onrender.com/usuarios/me', requestOptions)
            if (!response.ok) {
                setToken(null);
            }else{
                const data = await response.json();
                setUser(data.username);
                setPic(data.pic);
                setId(data.id);
            }

            localStorage.setItem('token', token);
        }
        fetchUser();
    }, [token])

    return (
        <TokenContext.Provider value={{ token, setToken, user, pic, id}}>
            {props.children}
        </TokenContext.Provider>
    )
}