// Support.jsx
import { useState, useEffect } from "react";
const Support = () => {
  const [tools, setTools] = useState([]);
  // Cargar las herramientas desde el archivo JSON
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/data/tools.json"); // Asegúrate de que tools.json esté en la carpeta pública
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error("Error al cargar las herramientas", error);
      }
    };

    fetchTools();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const openTool = (url) => {
    window.open(url, "_blank");
  };

  const supportTools = tools.filter((tool) => tool.group === "soporte");

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">
        Herramientas de soporte
      </h2>
      <div className="grid grid-cols-3 gap-6 p-6">
        {supportTools.map((tool, index) => (
          <div
            key={index}
            onClick={() => openTool(tool.url)}
            className="w-60 h-48 bg-gray-400 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-lg hover:bg-gray-500 transition-colors p-4"
          >
            <h3 className="text-white text-lg font-semibold">{tool.name}</h3>
            <p className="text-white text-sm mt-2">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
