/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

const UseState = (props: { name: string }) => {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  const { name } = props;

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };
  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };
  const onChangeInput = (newValue: string) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== process.env.NEXT_PUBLIC_SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 1500);
    }
  }, [state.loading, state.value]);
  if (!state.deleted && !state.confirmed) {
    return (
      <section className="flex flex-col items-center w-screen h-96 justify-evenly">
        <h3 className="text-3xl font-bold">Eliminar {name}</h3>
        <p className="text-2xl ">Por favor, escribe el código de seguridad</p>
        {state.error && !state.loading && (
          <p className="text-xl font-medium text-red-600">
            error: el código es incorrecto
          </p>
        )}
        {state.loading && (
          <p className="text-xl font-medium text-green-600">...cargando</p>
        )}
        <div className="flex ">
          <input
            placeholder="Código de seguridad"
            className="p-2 mx-4 text-xl text-center border-2 rounded-md"
            value={state.value}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput(e.target.value);
            }}
          />
          <button
            className="p-2 text-xl font-semibold bg-green-200 border-2 border-green-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-green-800 hover:text-slate-100"
            onClick={() => onCheck()}
          >
            Comprobar
          </button>
        </div>
      </section>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <section className="flex flex-col items-center w-screen h-96 justify-evenly">
        <h2 className="mt-4 text-3xl font-bold text-center text-stone-800">
          ¿Seguro que quiere eliminar UseState?
        </h2>
        <div className="flex items-center mt-4 justify-evenly">
          <button
            className="px-4 py-2 mx-16 text-xl font-medium bg-red-600 border-2 rounded-lg shadow-lg text-stone-100"
            onClick={() => {
              onDelete();
            }}
          >
            Si, eliminar
          </button>
          <button
            className="px-4 py-2 mx-16 text-xl font-medium bg-green-600 border-2 rounded-lg shadow-lg text-stone-100"
            onClick={() => {
              onReset();
            }}
          >
            No, volver atrás
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col items-center w-screen h-96 justify-evenly">
        <h2 className="mt-4 text-3xl font-bold text-center text-stone-800">
          Eliminado con éxito
        </h2>
        <button
          className="px-4 py-2 mx-16 text-xl font-medium bg-green-600 border-2 rounded-lg shadow-lg text-stone-100"
          onClick={() => {
            onReset();
          }}
        >
          Recuperar UseState
        </button>
      </section>
    );
  }
};

export default UseState;
