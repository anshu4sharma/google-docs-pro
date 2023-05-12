import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback } from "react";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const App = () => {
  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    console.log(wrapper);
    const editor = document.createElement("div");
    if (!wrapper) return;
    wrapper.innerHTML = "";
    wrapper.append(editor);
    new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
};

export default App;
