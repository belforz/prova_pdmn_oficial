import React from "react";
import BotaoPersonalizado from "./BotaoPetsonalizado";

export class BotaoFavorito extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.filtrarFavorito}
        className="btn btn-outline-warning font-weight-bold "
      >
        {!this.props.favorito ? (
          <BotaoPersonalizado
            tipo={"classic"}
            nome={"star"}
            tamanho={"2x"}
          />
        ) : (
          <BotaoPersonalizado
            tipo={"solid"}
            nome={"star"}
            tamanho={"2x"}
          />
        )}
      </button>
    );
  }
}

export default BotaoFavorito
