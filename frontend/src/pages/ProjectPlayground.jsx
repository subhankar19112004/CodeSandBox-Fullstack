import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorBuuton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import {BrowserTerminal} from "../components/molecules/Terminal/BrowserTerminal";

const ProjectPlayground = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);

      const editorSocketConn = io(
        `${import.meta.env.VITE_BACKEND_URL}/editor`,
        {
          query: { projectId: projectIdFromUrl },
        }
      );
      setEditorSocket(editorSocketConn);
    }
  }, [setProjectId, projectIdFromUrl, setEditorSocket]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
              overflow: "auto",
            }}
          >
            <TreeStructure/> 
          </div>
        )}
        <EditorComponent />
      </div>

      <EditorButton isActive={false} />
      {isOpen && (
        <EditorButton isActive={true} onClose={() => setIsOpen(false)} />
      )}
      <div>
        <BrowserTerminal/>
      </div>
    </>
  );
};

export default ProjectPlayground;
