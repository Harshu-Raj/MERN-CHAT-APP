// import { Provider } from "@/components/ui/provider"
// import { Provider } from "@/components/ui/provider"

import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <Provider>
//         <App />
//       </Provider>
//     </React.StrictMode>,
//   );
const root=createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
    
        <App />
     
    </React.StrictMode>
  );