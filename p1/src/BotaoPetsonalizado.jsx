const BotaoPersonalizado = (props) => {
  return (
  <i className={`fa-${props.tipo} fa-${props.nome} fa-${props.tamanho} `} style={{cursor: "pointer"}} onClick={props.removerLembrete}></i>
  );
};

export default BotaoPersonalizado;
