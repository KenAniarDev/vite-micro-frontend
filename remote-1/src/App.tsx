import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./Button";
import Card from "./Card";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant="h1" gutterBottom>
        Vite + Reacts
      </Typography>
      <Button />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Card />
    </>
  );
}

export default App;
