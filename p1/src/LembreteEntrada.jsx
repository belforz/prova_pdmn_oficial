import React from "react";

export class LembreteEntrada extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <input
          className="w-50 text-center fs-4 mb-4 border border-primary rounded"
          placeholder="Digite seu  novo lembrete"
        />
        <button type="button" className="w-50 btn btn-outline-primary ">
          OK
        </button>
      </div>
    );
  }
}

export default LembreteEntrada;
