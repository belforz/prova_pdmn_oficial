import React from "react";
import LembreteEntrada from "./LembreteEntrada";
import LembreteLista from "./LembreteLista";

const Dados = [
  { lembrete_um: "Preparar aula de programação" },
  { lembrete_dois: "Fazer Feura" },
  { lembrete_tres: "Preparar marmitas" },
];

class App extends React.Component {
  state = {
    lembrete_um: Dados[0].lembrete_um,
    lembrete_dois: Dados[1].lembrete_dois,
    lembrete_tres: Dados[2].lembrete_tres,
  };

  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="col-12">
              <LembreteLista
                lembrete_um={this.state.lembrete_um}
                lembrete_dois={this.state.lembrete_dois}
                lembrete_tres={this.state.lembrete_tres}
              />
            </div>
            <div className="col-12">
              <LembreteEntrada />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
