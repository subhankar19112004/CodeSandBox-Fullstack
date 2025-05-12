import React from "react";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { Button, Col, Flex, Row } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const { createProjectMutation } = useCreateProject();
  const navigate = useNavigate();


  async function handleCreateProject() {
    console.log("GOing to call the API");
    try {
      const response = await createProjectMutation();
      console.log("Now we should redirect to the editor");
      navigate(`/project/${response.data}`)
    } catch (error) {
      console.log("Error creating project : ", error);
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Flex justify="center" align="center">
          <Button type="primary" onClick={handleCreateProject}>
            Create Playground
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default CreateProject;
