import React from "react";
class LembreteLista extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center mt-3 bg-light">
        <ul className="list-group mx-3 my-3 w-100">
            {this.props.lembrete.map(lb => (
              <li key={lb.id} className="list-group-item text-center m-1 fs-4">
                {lb.texto}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default LembreteLista;
