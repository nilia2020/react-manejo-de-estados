/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from "react";

interface appState {
  value: string;
  error: boolean;
  loading: boolean;
  deleted: boolean;
  confirmed: boolean;
}

type Confirm = {
  type: "CONFIRM";
  payload?: string;
};
type Error = {
  type: "ERROR";
  payload?: string;
};
type Check = {
  type: "CHECK";
  payload?: string;
};
type Write = {
  type: "WRITE";
  payload: string;
};
type Delete = {
  type: "DELETE";
  payload?: string;
};
type Reset = {
  type: "RESET";
  payload?: string;
};

type appAction = Confirm | Error | Check | Write | Delete | Reset;

const initialState: appState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
const reducer = (state: appState, action: appAction): appState => {
  switch (action.type) {
    case "CONFIRM":
      return {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
      };
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        loading: true,
      };
    case "DELETE":
      return {
        ...state,
        deleted: true,
      };
    case "RESET":
      return {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
      };
    case "WRITE":
      return {
        ...state,
        value: action.payload,
      };
  }
};

const UseReducer = (props: { name: string }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name } = props;
  useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== process.env.NEXT_PUBLIC_SECURITY_CODE) {
          dispatch({
            type: "ERROR",
          });
        } else {
          dispatch({
            type: "CONFIRM",
          });
        }
      }, 1500);
    }
  }, [state.loading]);
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
              dispatch({
                type: "WRITE",
                payload: e.target.value,
              });
            }}
          />
          <button
            className="p-2 text-xl font-semibold bg-green-200 border-2 border-green-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-green-800 hover:text-slate-100"
            onClick={() =>
              dispatch({
                type: "CHECK",
              })
            }
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
              dispatch({
                type: "DELETE",
              });
            }}
          >
            Si, eliminar
          </button>
          <button
            className="px-4 py-2 mx-16 text-xl font-medium bg-green-600 border-2 rounded-lg shadow-lg text-stone-100"
            onClick={() => {
              dispatch({
                type: "RESET",
              });
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
            dispatch({
              type: "RESET",
            });
          }}
        >
          Recuperar {name}
        </button>
      </section>
    );
  }
};

export default UseReducer;
