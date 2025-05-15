import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorBuuton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";

const ProjectPlayground = () => {
  const [isOpen, setIsOpen] = useState(true);

  
  const { projectId: projectIdFromUrl } = useParams();
  const{ setProjectId, projectId } = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromUrl);
  },[setProjectId, projectIdFromUrl]);



  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1>Project Playground</h1>
        Project Id : {projectIdFromUrl}
      </div>
      {projectId && (
        <div
          style={{
            backgroundColor:"#333254",
            paddingRight:"10px",
            paddingTop:"0.3vh",
            minWidth:"250px",
            maxWidth:"25%",
            height:"99.7vh",
            overflow:"auto"
          }}
        >
          <TreeStructure/>
        </div>
      )}
      <EditorComponent />
      <EditorButton isActive={false} />
      {isOpen && (
                <EditorButton 
                    isActive={true} 
                    onClose={() => setIsOpen(false)} 
                />
            )}

    </>
  );
};

export default ProjectPlayground;
