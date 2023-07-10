function InputText(props) {
  return (
    <input
      type="text"
      className="form-controllg rounded border border-white shadow"
      placeholder="Enter URL Here..."
      autoComplete="off"
      value={props.value}
      onChange={(e) => props.handleInput(e.target.value)}
      onKeyPress={(e) => props.handleKeyPress(e)}
      style={{ height: "55px", width: "100%" }}
    />
  );
}

export default InputText;
