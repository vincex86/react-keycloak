import React, { useState, useEffect } from "react";
import { useKeycloak } from '@react-keycloak/web';

function Home() {
 
    const { keycloak, initialized } = useKeycloak();
    
    const [result, setResult] = useState("");

    const callApi = async () => {
        try {
        const res = await fetch("http://localhost:5101", {
            headers: {
            "Authorization": "Bearer " + keycloak.token
            }
        });
        if (!res.ok) throw new Error("Erreur API: " + res.status);
        const data = await res.text();
        setResult(data);
        } catch (err) {
        setResult(err.message);
        }
    };

    const clear = () => {
        setResult("");
    }


    if (!initialized) return <div>🔄 Loading authentication...</div>;
    
    var exp = new Date(keycloak.tokenParsed?.exp * 1000);

    return (
    <div className="Home">
    <h1>This is Home</h1>
    <br/>
        {keycloak.authenticated ? (
            <>
            <h1>Welcome, {keycloak.tokenParsed?.preferred_username}!</h1>
            <p>Familiy Name: {keycloak.tokenParsed?.family_name}</p>
            <p>Given name: {keycloak.tokenParsed?.given_name}</p>
            <p>Email: {keycloak.tokenParsed?.email}</p>
            <p>Expiration: {exp.toUTCString()}</p>
            <p>Issuer: {keycloak.tokenParsed?.iss}</p>
            <h3>Rôles du realm</h3>
            <ul>
                {keycloak.tokenParsed?.realm_access?.roles?.map((role) => (
                <p key={role}>{role}</p>
                ))}
            </ul>
            <p>Token: {keycloak.token}</p>
            <button onClick={() => keycloak.logout()}>Logout</button>
            </>
        ) : (
            <button onClick={() => keycloak.login()}>Login</button>
        )}
        <br/> <br/>
        <div>
            <button onClick={callApi}>Appeler l’API</button>
            <button onClick={clear}>Clear</button>
            <p>Résultat : {result}</p>
        </div>

    </div>
 );
}
export default Home;