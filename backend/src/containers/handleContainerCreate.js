import Docker from "dockerode";


const docker = new Docker();
export const handleContainerCreate = async (projectId, socket) => {
    console.log("Project id recieved for container create: ", projectId);
    const container = await docker.createContainer({
        Image: 'sandbox', // name given by us for the written dockerfile
        AttachStdin:true,
        AttachStdout:true,
        AttachStderr:true,
        CMD: ['/bin/bash'],
        Tty:true,
        User: "sandbox"

    })
};