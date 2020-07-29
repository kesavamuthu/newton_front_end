import React from "react";

function ProductInputs(props) {
  let tmp = props["props"];
  let valid = props["props"].isValid;
  console.log(valid);
  return Object.keys(tmp)
    .slice(0, 3)
    .map((e, i) => {
      return (
        <>
          <label>
            {e}
            <span className={valid[i] ? "mandatory" : ""}> *</span>
          </label>{" "}
          <br />
          <input type="text" name={e} placeholder={e} value={tmp[e]} />
          <br />
        </>
      );
    });
}

export default ProductInputs;
