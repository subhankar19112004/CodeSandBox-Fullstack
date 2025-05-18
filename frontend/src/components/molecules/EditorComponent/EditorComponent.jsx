import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';


export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null,
    });

    const { editorSocket } = useEditorSocketStore();
    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

    async function downloadTheme(){
        const response = await fetch('/Dracula.json')
        const data = await response.json()
        setEditorState({ ...editorState, theme: data })
    }

    function handleEditorTheme (editor, monaco) {

                monaco.editor.defineTheme('dracula', editorState.theme);
                monaco.editor.setTheme('dracula');
    
    }

    editorSocket?.on("readFileSuccess", (data) => {
        console.log("read File Success", data);
        setActiveFileTab(data.path, data.value)
    })
  
    useEffect(() => {
        // fetch('/Dracula.json')
        // .then(response => response.json())
        // .then((data) => setEditorState({ ...editorState, theme: data }))
        downloadTheme();
    }, [])

  return (
    <>
        {
            editorState.theme  && 
            <Editor
            height={'80vh'}
            width={'100%'}
            defaultLanguage="javascript" 
            defaultValue="console.log('Hello world!'); // This is not mandatory you can remove this line and continue coding"
            theme=""
            options={{
                fontSize: 18,
                fontFamily: 'monospace',
            }}
            value={ activeFileTab?.value ? activeFileTab.value : "console.log('Hello world!'); // This is not mandatory you can remove this line and continue coding" }
            onMount={handleEditorTheme}
        />}
    </>
  ) 
}
