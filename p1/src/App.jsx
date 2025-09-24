import React from "react";
import LembreteEntrada from "./LembreteEntrada";
import LembreteLista from "./LembreteLista";
import { BotaoFavorito } from "./BotaoFavorito";
import Figura from "./Figura";

class App extends React.Component {
  state = {
    lembrete: [],
    valorLembrete: "",
    somenteFavoritos: false
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

    this.setState((estado) => {
      const copiaLista = [];
      for (let i = 0; i < estado.lembrete.length; i++) {
        copiaLista.push(estado.lembrete[i]);
      }
      copiaLista.push(novoLembrete);

      return {
        lembrete: copiaLista,
        valorLembrete: "",
      };
    });
  };

  removerLembrete = (codigo) => {
    this.setState((estado) => ({
      lembrete: estado.lembrete.filter((lb) => lb.codigo !== codigo),
    }));
  };

  filtrarFavorito = () =>{
    this.setState((estado) => ({
      somenteFavoritos: !estado.somenteFavoritos
    }))
  }



  render() {
    const listaDeLembretes = this.state.somenteFavoritos
    ? this.state.lembrete.filter(lb => lb.favorito === true)
    : this.state.lembrete;

    console.log(this.state)

    return (
      <div className="col-12 col-md-8 col-lg-6">
        <div className="d-flex justify-content-between mb-2">
        <Figura tipo={"solid"} nome={"hippo"} tamanho={"4x"} cor={"#49eebb"} />
        <Figura tipo={"solid"} nome={"cat"} tamanho={"4x"} cor={"#49eebb"} sentido={"horizontal"} />

        </div>
        <div className="card ms-2">
          <div className="card-body">
            <div className="row d-flex justify-content-center">
              <div className="w-50 border border rounded mb-2 bg-light">
              <p className="text-center fs-3">
                Aplicativo de Lembrete em <Figura tipo={"brands"} nome={"react"} cor={"#49eebb"} />
              </p>

              </div>
            </div>
            <div className="d-flex justify-content-end">
              <BotaoFavorito filtrarFavorito={this.filtrarFavorito}/>
            </div>
            <LembreteLista
              lembrete={listaDeLembretes}
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
