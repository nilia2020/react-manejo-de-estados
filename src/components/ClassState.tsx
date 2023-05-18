import React from "react";

interface PropsType {
  name: string;
}

class ClassState extends React.Component<PropsType> {
  render() {
    return (
      <section className="flex flex-col items-center w-screen h-96 justify-evenly">
        <h2 className="text-3xl font-bold ">Eliminar {this.props.name}</h2>
        <p className="text-2xl ">Por favor, escribe el código de seguridad</p>
        <div className="flex ">
          <input
            placeholder="Código de seguridad"
            className="p-2 mx-4 text-xl text-center border-2 rounded-md"
          />
          <button className="p-2 text-xl font-semibold bg-red-100 border-2 border-red-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-red-600 hover:text-slate-100">
            Comprobar
          </button>
        </div>
      </section>
    );
  }
}

export default ClassState;
