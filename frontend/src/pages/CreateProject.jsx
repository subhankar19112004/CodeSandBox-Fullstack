import React from "react";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { Button, Layout } from "antd";
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: screen.width,
};

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  width: screen.width,
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
const contentStyle = {
  textAlign: "center",
  minHeight: screen.height,
  width: screen.width,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};
const footerStyle = {
  textAlign: "center",
  width: screen.width,
  color: "#fff",
  backgroundColor: "#4096ff",
};
const CreateProject = () => {
  const { createProjectMutation } = useCreateProject();
  const { Header, Footer, Content } = Layout;

  async function handleCreateProject() {
    console.log("GOing to call the API");
    try {
      await createProjectMutation();
      console.log("Now we should redirect to the editor");
    } catch (error) {
      console.log("Error creating project : ", error);
    }
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <h1>Create Project</h1>
      </Header>
      <Content style={contentStyle}>
        <div>
          <Button type="primary" onClick={handleCreateProject}>
            Create playground
          </Button>
        </div>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default CreateProject;
