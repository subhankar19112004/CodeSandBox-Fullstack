import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';


export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null,
    });

    async function downloadTheme(){
        const response = await fetch('/Dracula.json')
        const data = await response.json()
        setEditorState({ ...editorState, theme: data })
    }

    function handleEditorTheme (editor, monaco) {

                monaco.editor.defineTheme('dracula', editorState.theme);
                monaco.editor.setTheme('dracula');
    
    }

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
            onMount={handleEditorTheme}
        />}
    </>
  )
}
