import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes"; // from routes.jsx

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
