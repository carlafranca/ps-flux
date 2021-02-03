import React from "react";

function Select(props) {
  let wrapperClass = "form-group";
  if (props.error && props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          className="form-control"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="" />
          {props.list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

export default Select;
