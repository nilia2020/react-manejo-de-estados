import React from "react";

const UseState = (prop: { name: string }) => {
  const [error, setError] = React.useState(false);
  return (
    <section className="flex flex-col items-center w-screen h-96 justify-evenly">
      <h2 className="text-3xl font-bold">Eliminar {prop.name}</h2>
      <p className="text-2xl ">Por favor, escribe el código de seguridad</p>
      {error && (
        <p className="text-xl font-medium text-red-600">
          error: el código es incorrecto
        </p>
      )}
      <div className="flex ">
        <input
          placeholder="Código de seguridad"
          className="p-2 mx-4 text-xl text-center border-2 rounded-md"
        />
        <button
          className="p-2 text-xl font-semibold bg-orange-100 border-2 border-orange-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-orange-600 hover:text-slate-100"
          onClick={() => setError(!error)}
        >
          Comprobar
        </button>
      </div>
    </section>
  );
};

export default UseState;
