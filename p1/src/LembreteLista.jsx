import React from "react";
class LembreteLista extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center mt-3 bg-light">
        <ul className="list-group mx-3 my-3 w-100">
          <li className="list-group-item text-center fs-4">
            {this.props.lembrete_um}
          </li>
          <li className="list-group-item text-center fs-4">
            {this.props.lembrete_dois}
          </li>
          <li className="list-group-item text-center fs-4">
            {this.props.lembrete_tres}
          </li>
        </ul>
      </div>
    );
  }
}

export default LembreteLista;
