import Home from "./Home";
import TextEditor from "./TextEditor";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}/>
      <Route path="/:id" element={<TextEditor />}/>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
