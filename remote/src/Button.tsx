import { useState } from "react";
import { Button as MUIButton } from "@mui/material";

function Button() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <MUIButton
        variant="contained"
        onClick={() => setCount((count) => count + 1)}
      >
        counts {count}
      </MUIButton>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default Button;
