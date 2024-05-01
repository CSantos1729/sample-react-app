import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

interface BackgroundAppProps {
  backgroundImage: string;
}

const BackgroundApp: React.FC<BackgroundAppProps> = ({ backgroundImage }) => (
  <React.StrictMode>
    <NextUIProvider className="h-[400vh]">
      <main
        className="dark text-foreground bg-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat", 
        }}
      >
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BackgroundApp backgroundImage="src/assets/background.jpeg" />
);
