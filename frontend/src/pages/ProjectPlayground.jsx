import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorBuuton/EditorButton";

const ProjectPlayground = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { projectId } = useParams();
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1>Project Playground</h1>
        Project Id : {projectId}
      </div>

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
