// src/pages/ComederoPage.tsx
import React, { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { io, Socket } from "socket.io-client";

const ComederoPage = () => {
  const [horas, setHoras] = useState<string[]>([]);
  const [horaInput, setHoraInput] = useState("00:00");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io(
      "https://arduino-sockets-production.up.railway.app",
      {
        path: "/io",
      }
    );

    newSocket.on("connect", () => {
      console.log("✅ Conectado al servidor!");
      newSocket.emit("mensaje", "Hola desde cliente");
    });

    newSocket.on("mensaje", (data) => {
      console.log("📩 Mensaje recibido:", data);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Desconectado del servidor");
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Esto sí es correcto como 'Destructor'
    };
  }, []);

  useEffect(() => {
    // Aquí puedes manejar la lógica para recibir horas desde el servidor
    if (socket) {
      socket.on("hora", (hora: string) => {
        console.log("📩 Hora recibida:", hora);
        setHoras((prevHoras) => [...prevHoras, hora]);
      });
    }
  }, [socket]);

  const agregarHora = (e: React.FormEvent) => {
    e.preventDefault();
    if (!horaInput || horas.includes(horaInput)) return;

    const nuevaLista = [...horas, horaInput];
    setHoras(nuevaLista);

    // Enviar la nueva hora al servidor si el socket está conectado
    if (socket) {
      socket.emit("nueva-hora", horaInput);
      console.log("📤 Hora enviada al servidor:", horaInput);
    }

    setHoraInput("00:00");
  };

  const eliminarHora = (hora: string) => {
    setHoras(horas.filter((h) => h !== hora));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray">
      <div className="absolute top-5 right-5">
        <LogoutButton />
      </div>
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-white">
        {/* Gato */}
        <div className="absolute -top-32 right-0 flex justify-center items-center">
          <div className="relative h-[200px] w-[350px]">
            <div className="absolute bottom-[52px] left-[70px] h-[10px] w-[240px] bg-black/20 rounded-[10px] animate-[shadow_2s_infinite]"></div>
            <div className="cat absolute bottom-[60px] right-[50px] h-[65px] w-[80px] bg-[#f19b1a] rounded-r-[80px]">
              <div className="ear absolute bottom-[64px] left-[8px] h-[15px] w-[15px] bg-[#f19b1a] rounded-tl-[20px] shadow-[25px_0_0_0_#f19b1a]"></div>
              <div className="eye absolute top-[18px] left-[15px] h-[7px] w-[10px] border-b-[2px] border-x-[2px] border-black rounded-b-[15px] before:content-[''] before:absolute before:left-[30px] before:h-[7px] before:w-[10px] before:border-b-[2px] before:border-x-[2px] before:border-black before:rounded-b-[15px]"></div>
              <div className="mouth absolute top-[38px] left-[27px] h-[15px] w-[17px] bg-[#2c2c2c] rounded-b-[5px] animate-[mouth-move_2s_infinite] origin-top"></div>
              <div className="nose absolute top-[32px] left-[25px] h-[12px] w-[12px] bg-white rounded-full shadow-[12px_0_0_0_white] before:content-[''] before:absolute before:left-[6px] before:h-[8px] before:w-[12px] before:bg-white after:content-[''] after:absolute after:bottom-[7px] after:left-[6px] after:border-t-[8px] after:border-l-[5px] after:border-r-[5px] after:border-solid after:border-t-[#ef926b] after:border-transparent"></div>
              <div className="tail absolute bottom-0 right-[150px] h-[20px] w-[100px] bg-[#d07219] rounded-l-[20px]"></div>
              <div className="body absolute bottom-0 right-[65px] h-[90px] w-[140px] bg-[#f19b1a] rounded-t-[60px] animate-[sleep_2s_infinite] origin-bottom-right before:content-[''] before:absolute before:bottom-0 before:left-[22px] before:h-[12px] before:w-[30px] before:bg-white before:rounded-[6px] before:shadow-[45px_0_0_0_white]"></div>
              <div className="bubble absolute top-[20px] left-[65px] h-[20px] w-[20px] bg-white/40 rounded-[50px_50px_50px_5px] animate-[bubble-scale_2s_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          ¡Comedero de Mascota!
        </h2>

        {/* Formulario */}
        <form onSubmit={agregarHora} className="flex flex-row w-full gap-2">
          <input
            type="time"
            value={horaInput}
            onChange={(e) => setHoraInput(e.target.value)}
            required
            className="bg-gray-50 text-sm text-gray-900 rounded-lg p-2.5 w-full dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={!horaInput}
            className="disabled:text-gray-400 bg-gray-900 text-[#f19b1a] hover:text-white px-4 py-2 rounded hover:bg-[#f19b1a]/90"
          >
            ➤
          </button>
        </form>

        {/* Lista de horas */}
        <div className="mt-5 flex gap-2 flex-wrap">
          {horas.map((hora) => (
            <span
              key={hora}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-sm dark:bg-yellow-900 dark:text-yellow-300"
            >
              {hora}
              <button
                onClick={() => eliminarHora(hora)}
                className="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-xs hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300"
                aria-label="Remove"
              >
                <svg
                  className="w-2 h-2"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComederoPage;
