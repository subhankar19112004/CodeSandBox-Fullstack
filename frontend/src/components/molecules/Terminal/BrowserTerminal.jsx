import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

export const BrowserTerminal = () => {

  const terminalRef = useRef(null);

  const socket = useRef(null);

  const { projectId: projectIdFromUrl } = useParams();


  useEffect(() => {
    const term = new Terminal({ 
      cursorBlink:true,
      theme: {
        background: '#282a37',
        foreground: "#f8f8f3",
        cursorAccent: "#282a37",
        red: "#ff5544",
        green: "#50fa7b",
        yellow: "#f1fa8c", 
        blue: "#8be9fd",
        magenta: "#bd93f9",
        cyan: "#8be9fd",
        black: "#282a37",
        white: "#f8f8f3"
      },
      fontSize: 16,
      fontFamily: "Fira Code, monospace",
      convertEol: true, // convert \r\n to \n
    });
    term.open(terminalRef.current);
    let fitAddon = new FitAddon()
    term.loadAddon(fitAddon);
    fitAddon.fit();

    socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
      query: {
        projectId: projectIdFromUrl
      }
    });

    socket.current.on('shell-output', (data) => {
      term.write(data);
      fitAddon.fit();
    });

    term.onData((data) => {
      console.log(data);
      socket.current.emit('shell-input', data);
    });

    return () => {
      term.dispose();
      socket.current.disconnect();
    };


  }, [])
   
  return (
    <>
      <div ref={terminalRef} style={{  height: '25vh', overflow: 'auto' }} className='terminal' id='terminal-container' >
      </div>
    </>
  )
}

