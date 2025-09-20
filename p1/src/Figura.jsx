import React from "react";

export class Figura extends React.Component  {
    render(){
        return (
          <i
            className={`fa-${this.props.tipo} fa-${this.props.nome} fa-${this.props.tamanho} fa-flip-${this.props.sentido} `}
            style={{ color: this.props.cor }}
            
          ></i>
        );

    }
};

export default Figura;
