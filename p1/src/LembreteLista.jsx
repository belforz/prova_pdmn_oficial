import React from "react";
import BotaoPersonalizado from "./BotaoPetsonalizado";
class LembreteLista extends React.Component {
  render() {
    return (
      <div className="d-flex mt-3 bg-light">
        <ul className="list-group mx-3 my-3 w-100">
          {this.props.lembrete.map((lb) => (
            <li
              key={lb.codigo}
              className="list-group-item text-center m-1 fs-4"
            >
          
              <div className="d-flex justify-content-between ms-5">
                 {lb.texto}
                
              <BotaoPersonalizado
                tipo={"solid"}
                nome={"trash"}
                tamanho={"2x"}
                removerLembrete={() => this.props.removerLembrete(lb.codigo)}
              />
              </div>

              {/* {lb.texto} */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LembreteLista;
