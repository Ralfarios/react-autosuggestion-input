import "./style.css";

function CInputSearch({
  className = "",
  inputClassName = "",
  placeholder = "",
  ...props
}) {
  return (
    <div className={`c__input-search-wrapper ${className}`}>
      <i className="c__input-search-icon material-icons">search</i>
      <input
        className={`c__input-search ${inputClassName}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default CInputSearch;
