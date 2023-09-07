import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block", "formula"],
  ["clean", "link", "video"],
];

const TextEditor = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState<ReturnType<typeof io>>();
  const [quill, setQuill] = useState<Quill>();
  const copyUrlToClipboard = () => {
    const locationUrl = window.location.href;
    navigator.clipboard.writeText(locationUrl);
  };
  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    const editor = document.createElement("div");
    if (!wrapper) return;
    wrapper.innerHTML = "";
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quill.disable();
    quill.setText("Loading...");
    setQuill(quill);
  }, []);

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    s.on("connect", () => {
      console.log("connected");
    });
    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta: any) => {
      quill.updateContents(delta as any);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta: unknown, _oldDelta: unknown, source: unknown) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);
  useEffect(() => {
    if (!socket || !quill) return;
    socket.once("load-document", (document: unknown) => {
      quill.setContents(document as any);
      quill.enable();
    });
    socket.emit("get-document", id);
  }, [socket, quill, id]);

  useEffect(() => {
    if (!socket || !quill) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <div className="w-full">
      <div className="container" ref={wrapperRef} />
      <button
        type="button"
        onClick={copyUrlToClipboard}
        className="py-2 px-10 sticky right-8 left-8 flex bottom-4 justify-center items-center gap-2 rounded-full bg-blue-600 border border-transparent font-semibold text-white hover:bg-blue-800 hover:text-white focus:outline-none "
      >
        🔗 Share Link
      </button>
    </div>
  );
};

export default TextEditor;
