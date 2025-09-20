import React from "react";
import LembreteEntrada from "./LembreteEntrada";
import LembreteLista from "./LembreteLista";

class App extends React.Component {
  state = {
    lembrete: [],
    valorLembrete: "",
  };

  eventoDeMudanca = (evento) => {
    this.setState({ valorLembrete: evento.target.value });
  };

  adicionarfavorito = (codigo) => {
    this.setState((estado) => ({
      lembrete: estado.lembrete.map((lb) => {
        lb.codigo === codigo ? (lb.favorito = true) : lb;
        return lb;
      }),
    }));
  };

  removerFavorito = (codigo) => {
    this.setState((estado) => ({
      lembrete: estado.lembrete.map((lb) => {
        lb.codigo === codigo ? (lb.favorito = false) : lb;
        return lb;
      }),
    }));
  };

  adicionarLembrete = () => {
    const texto = this.state.valorLembrete;
    const novoLembrete = {
      codigo: Math.random() * 16,
      texto: texto,
      favorito: false,
    };
    this.setState((estado) => ({
      lembrete: estado.lembrete.concat(novoLembrete),
      valorLembrete: ""
    }));
  };

  removerLembrete = (codigo) => {
    this.setState((estado) => ({
      lembrete: estado.lembrete.filter((lb) => lb.codigo !== codigo),
    }));
  };

  render() {
    console.log(this.state);
    return (
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card">
          <div className="card-body">
            <LembreteLista
              lembrete={this.state.lembrete}
              removerLembrete={this.removerLembrete}
              adicionarfavorito={this.adicionarfavorito}
              removerFavorito={this.removerFavorito}
            />
          </div>

          <div className="mb-5">
            <LembreteEntrada
              adicionarLembrete={this.adicionarLembrete}
              novoLembrete={this.state.valorLembrete}
              eventoDeMudanca={this.eventoDeMudanca}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
