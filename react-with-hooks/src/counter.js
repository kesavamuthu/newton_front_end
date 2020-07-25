import React, { useState } from "react";

const Counter = () => {
  let [count, countChangerInbuilt] = useState(0);
  return (
    <div>
      <button onMouseOver={() => countChangerInbuilt}>Click </button>
      <div>Clicked times {count}</div>
    </div>
  );
};

export default Counter;
