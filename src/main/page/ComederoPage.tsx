import React, { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";

type Hora = {
  id: string;
  hora: number;
  minuto: number;
};

const ComederoPage = () => {
  const [horas, setHoras] = useState<Hora[]>([]);
  const [horaInput, setHoraInput] = useState("00:00");

  useEffect(() => {
    fetch("https://arduino-sockets-production.up.railway.app/api/horas")
      .then((res) => res.json())
      .then((data: Hora[]) => {
        if (Array.isArray(data)) {
          setHoras(data);
          if (data.length > 0) {
            const primera = data[0];
            setHoraInput(
              `${String(primera.hora).padStart(2, "0")}:${String(
                primera.minuto
              ).padStart(2, "0")}`
            );
          }
        }
      })
      .catch((err) => console.error("Error al obtener la hora:", err));
  }, []);

  const guardarHora = (nuevaHora: Hora) => {
    fetch("https://arduino-sockets-production.up.railway.app/api/programar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaHora),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar la hora");
        return res.json();
      })
      .then(() => {
        console.log("Hora guardada correctamente");
      })
      .catch((err) => console.error("Error al guardar la hora:", err));
  };

  const agregarHora = (e: React.FormEvent) => {
    e.preventDefault();
    if (!horaInput) return;

    const [h, m] = horaInput.split(":");
    const nuevaHora: Hora = {
      id: crypto.randomUUID(),
      hora: parseInt(h),
      minuto: parseInt(m),
    };

    setHoras((prev) => [...prev, nuevaHora]);
    guardarHora(nuevaHora);
  };

  const eliminarHora = (id: string) => {
    // Aquí podrías agregar llamada DELETE si la API lo permite
    setHoras((prev) => prev.filter((hora) => hora.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="absolute top-5 right-5">
        <LogoutButton />
      </div>
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full text-white">

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

        <h2 className="text-2xl font-semibold mb-6 text-center">
          ¡Programa tu comedero!
        </h2>

        <form onSubmit={agregarHora} className="flex gap-3 mb-6">
          <input
            type="time"
            value={horaInput}
            onChange={(e) => setHoraInput(e.target.value)}
            required
            className="bg-gray-50 text-gray-900 rounded-lg p-2.5 flex-grow dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors shadow-md hover:shadow-lg"
          >
            Guardar
          </button>
        </form>

        <div className="flex space-x-4 overflow-x-auto py-2">
          {horas.length === 0 && (
            <p className="text-gray-400">No hay horas programadas aún.</p>
          )}

          {horas.map(({ id, hora, minuto }) => (
            <div
              key={id}
              className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg shadow-md min-w-max"
            >
              <span className="text-lg font-mono mr-1">
                {String(hora).padStart(2, "0")}:
                {String(minuto).padStart(2, "0")}
              </span>
              <button
                onClick={() => eliminarHora(id)}
                className="text-yellow-700 hover:text-yellow-900 font-bold px-2 py-1 rounded hover:bg-yellow-300 transition-colors"
                aria-label={`Eliminar hora ${hora}:${minuto}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComederoPage;
