function SubmitButton({ handleSubmit, ...props }) {
  return (
    <button
      className="submit-button border-0 fs-4"
      type="button"
      style={{ height: "55px", width: "100%" }}
      onClick={handleSubmit}
      {...props}
    >
      Submit
    </button>
  );
}

function DownloadButton(props) {
  return (
    <a href={props.target} target="_blank" download rel="noreferrer" className="m-1">
      <button type="button" className="download-button">
        {props.text}
      </button>
    </a>
  );
}

export { SubmitButton, DownloadButton };
