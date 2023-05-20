import React from "react";

const UseState = (props: { name: string }) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { name } = props;
  React.useEffect(() => {
    console.log("empezando el efecto");
    if (!!loading) {
      setTimeout(() => {
        console.log("haciendo la validación");
        setLoading(false);
        console.log("finalizando la validación");
      }, 3000);
    }
    console.log("finalizando el efecto");
  }, [loading]);
  return (
    <section className="flex flex-col items-center w-screen h-96 justify-evenly">
      <h2 className="text-3xl font-bold">Eliminar {name}</h2>
      <p className="text-2xl ">Por favor, escribe el código de seguridad</p>
      {error && (
        <p className="text-xl font-medium text-red-600">
          error: el código es incorrecto
        </p>
      )}
      {loading && (
        <p className="text-xl font-medium text-green-600">...cargando</p>
      )}
      <div className="flex ">
        <input
          placeholder="Código de seguridad"
          className="p-2 mx-4 text-xl text-center border-2 rounded-md"
        />
        <button
          className="p-2 text-xl font-semibold bg-green-200 border-2 border-green-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-green-800 hover:text-slate-100"
          onClick={() => setLoading(true)}
        >
          Comprobar
        </button>
      </div>
    </section>
  );
};

export default UseState;
