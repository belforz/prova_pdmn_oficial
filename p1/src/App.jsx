import React from "react";
import LembreteEntrada from "./LembreteEntrada";
import LembreteLista from "./LembreteLista";

class App extends React.Component {
  state = {
    lembrete: [],
    valorLembrete: "",
  }

  eventoDeMudanca = (event) => {
    this.setState({valorLembrete: event.target.value})
  }

  adicionarLembrete = () => {
    const texto = this.state.valorLembrete
    const novoLembrete = {
      id: Math.random() * 16,
      texto: texto
    }
    this.setState(estado => ({
      lembrete: estado.lembrete.concat(novoLembrete),
      valorLembrete: ""
    }));

   

    
  }

  

  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="col-12">
              <LembreteLista lembrete={this.state.lembrete}/>
            </div>
            <div className="col-12">
              <LembreteEntrada adicionarLembrete={this.adicionarLembrete} novoLembrete={this.state.valorLembrete} eventoDeMudanca={this.eventoDeMudanca} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
