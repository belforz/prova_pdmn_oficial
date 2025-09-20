import React from "react";
export class BotaoPersonalizado extends React.Component {
  render() {
    return (
      <i
        className={`fa-${this.props.tipo} fa-${this.props.nome} fa-${this.props.tamanho} `}
        style={{ cursor: "pointer", color: this.props.cor }}
        onClick={
          this.props.removerLembrete ||
          this.props.adicionarFavorito ||
          this.props.removerFavorito || this.props.filtrarFavorito
        }
      ></i>
    );
  }
}

export default BotaoPersonalizado;
