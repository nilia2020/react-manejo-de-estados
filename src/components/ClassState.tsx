import React from "react";

type MyProps = {
  name: string;
};
type MyState = {
  error: boolean;
  loading: boolean;
  value: string;
};

import { Loading } from "./Loading";

class ClassState extends React.Component<MyProps, MyState> {
  state: MyState = {
    error: false,
    loading: false,
    value: "",
  };
  componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
    const { loading, value } = this.state;
    if (!!loading) {
      setTimeout(() => {
        console.log("haciendo la validación");
        if (value !== process.env.NEXT_PUBLIC_SECURITY_CODE) {
          this.setState({ error: true, loading: false });
        } else {
          this.setState({ loading: false, error: false });
        }
        console.log("finalizando la validación");
      }, 1500);
    }
  }
  render() {
    const { name } = this.props;
    const { error, loading, value } = this.state;
    return (
      <section className="flex flex-col items-center w-screen h-96 justify-evenly">
        <h2 className="text-3xl font-bold ">Eliminar {name}</h2>
        <p className="text-2xl ">Por favor, escribe el código de seguridad</p>
        {error && !loading && (
          <p className="text-xl font-medium text-red-600">
            error: el código es incorrecto
          </p>
        )}
        {loading && <Loading />}
        <div className="flex ">
          <input
            placeholder="Código de seguridad"
            className="p-2 mx-4 text-xl text-center border-2 rounded-md"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ value: e.target.value });
            }}
          />
          <button
            className="p-2 text-xl font-semibold bg-green-200 border-2 border-green-700 rounded-md shadow-lg cursor-pointer text-slate-950 hover:bg-green-800 hover:text-slate-100"
            onClick={() => this.setState({ loading: true })}
          >
            Comprobar
          </button>
        </div>
      </section>
    );
  }
}

export default ClassState;
