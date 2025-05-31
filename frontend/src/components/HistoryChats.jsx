import { useEffect, useState } from "react";
import api from '../api';

function HistoryChats() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chatsLoaded, setChatsLoaded] = useState(false); // Estado adicional
  const [userLoaded, setUserLoaded] = useState(false);   // Estado adicional

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    api.get("/api/roomChats/", { headers })
      .then(res => {
        setChats(res.data);
        setChatsLoaded(true); // Marcar como cargado

      })
      .catch(() => setChatsLoaded(true)); // Manejar errores
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    api.get("/api/getUser/", { headers })
      .then(res => {
        setUser(res.data);
        setUserLoaded(true); // Marcar como cargado
      })
      .catch(() => setUserLoaded(true)); // Manejar errores
  }, []);

  useEffect(() => {
    if (chatsLoaded && userLoaded) {
      setLoading(false); // Solo marcar como terminado cuando ambas solicitudes estén completas
    }
  }, [chatsLoaded, userLoaded]);

  if (loading) return <div>Cargando chats...</div>;

  
function comprobation(usuario_sender,usuario_receiver){
  if (usuario_sender===user.username){
    return usuario_receiver;
  }
  if(usuario_receiver===user.username){
    return usuario_sender
  }
   
}
  

  return (
    <div className="history-chats">
      <h2>History Chats</h2>
      {chats.map(chat => (
        <button key={chat.id}>{comprobation(chat.usuario_sender,chat.usuario_receiver)}</button>
      ))}
    </div>
  );
}

export default HistoryChats;