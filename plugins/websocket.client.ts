import { getID } from '~/auth/authToken';

export default defineNuxtPlugin((nuxtApp) => {
  const id = getID();
  const socket = new WebSocket(`ws://localhost:3001/ws/customer/${id}`); // ใช้ backticks สำหรับ template literal
  
  // const socket = new WebSocket('ws://localhost:3001/ws/admin');

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  // ให้ใช้งาน WebSocket ทั่วทั้งแอปผ่านชื่อ $socket
  nuxtApp.provide('socket', socket);
});