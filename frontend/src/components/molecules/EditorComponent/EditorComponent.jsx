import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";

export const EditorComponent = () => {
  let timerId = null;
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  const { activeFileTab } = useActiveFileTabStore();
  const { editorSocket } = useEditorSocketStore();

  async function downloadTheme() {
    const response = await fetch("/Dracula.json");
    const data = await response.json();
    setEditorState({ ...editorState, theme: data });
  }

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  function handleChange(value) {

    if(timerId !== null){ /**clear the backward timers if a user edits something before 2 seconds */
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      const editorContent = value;
      editorSocket.emit("writeFile", {
        data: editorContent,
        pathToFileOrFolder: activeFileTab.path,
      });
    }, 2000);
  }

  // editorSocket?.on("readFileSuccess", (data) => {
  //     console.log("read File Success", data);
  //     setActiveFileTab(data.path, data.value)
  // })

  useEffect(() => {
    // fetch('/Dracula.json')
    // .then(response => response.json())
    // .then((data) => setEditorState({ ...editorState, theme: data }))
    downloadTheme();
  }, []);

  return (
    <>
      {editorState.theme && (
        <Editor
          height={"80vh"}
          width={"100%"}
          defaultLanguage={undefined}
          defaultValue="console.log('Hello world!'); // This is not mandatory you can remove this line and continue coding"
          theme=""
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          language={extensionToFileType(activeFileTab?.extension)}
          onChange={handleChange}
          value={
            activeFileTab?.value
              ? activeFileTab.value
              : "console.log('Hello world!'); // This is not mandatory you can remove this line and continue coding"
          }
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};
