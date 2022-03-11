import { useRef, useState } from "react";

import { useClickOutside } from "../../hooks";

import "./style.css";

function CInputSearch({
  className = "",
  inputClassName = "",
  placeholder = "",
  onChange = () => {},
  keyword = "",
  data = [],
  error = "",
  onClick = () => {},
  ...props
}) {
  const ref = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleClick = (id) => {
    setIsFocus(false);
    onClick(id);
  };

  useClickOutside({ ref, cb: () => setIsFocus(false) });

  return (
    <div
      className={`c__input-search-wrapper ${className}`}
      ref={ref}
      onFocus={() => setIsFocus(true)}
    >
      <i className="c__input-search-icon material-icons">search</i>
      <input
        className={`c__input-search ${inputClassName} ${
          isFocus && keyword ? "show-suggest" : "hide-suggest"
        }`}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />

      {isFocus && keyword && (
        <div
          className={`c__input-search-suggestion-wrapper ${
            isFocus ? "shown" : "hidden"
          }`}
        >
          <div className="c__input-search-suggestion-separator" />
          {error === "notFound" ? (
            <p className="c__input-search-suggestion-notfound">
              <span>{keyword}</span> not found
            </p>
          ) : (
            data.map((el) => (
              <CInputSearchCard data={el} key={el.id} onClick={handleClick} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function CInputSearchCard({ onClick = () => {}, data = {} }) {
  const {
    card_images = [],
    atk = 0,
    def = 0,
    id = undefined,
    type = "",
    name = "",
    level = 0,
    attribute = "",
  } = data;
  return (
    <div className="c__input-search-suggestion" onClick={() => onClick(id)}>
      <img alt="" src={card_images[0]?.image_url_small} />
      <div className="c__input-search-suggestion-info">
        <h1>{name}</h1>
        <p>
          {attribute || type.toUpperCase()}
          {!["Trap Card", "Spell Card", "Magic Card"].includes(type) &&
            ` ・ ${atk} / ${def}`}
        </p>
        <p>
          {!level
            ? "N/A"
            : Array(level)
                .fill("star")
                .map((data, i) => (
                  <i className="material-icons" key={i}>
                    {data}
                  </i>
                ))}
        </p>
      </div>
    </div>
  );
}

export default CInputSearch;
