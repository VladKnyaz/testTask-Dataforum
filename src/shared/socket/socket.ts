import { io } from 'socket.io-client';

const codeEvent = import.meta.env.VITE_CODE_EVENT ?? "AAAAA11"
const codeRoom = import.meta.env.VITE_CODE_ROOM ?? "avrora"
const srvURL = import.meta.env.VITE_BASE_URL ?? "https://test.wpdataforum.ru/";

export const socket = io(srvURL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

socket.on("connect", () => {
    socket.emit('room', `${codeRoom}_${codeEvent}`)
});

socket.on("join", () => {
    console.log('connected');
});



// socket.on("room-status", (data) => {
//     console.log("Сообщение 'room-status ' получено:", data);
// });


socket.on("connect_error", (err) => {
    console.error("Ошибка подключения:", err);
});

socket.on("disconnect", (stop) => {
    console.error("отключение:", stop);
});
