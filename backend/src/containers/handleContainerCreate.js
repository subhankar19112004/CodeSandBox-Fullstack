import Docker from "dockerode";


const docker = new Docker();
export const handleContainerCreate = async (projectId, socket) => {
    console.log("Project id recieved for container create: ", projectId);
    try {
        const container = await docker.createContainer({
            Image: 'sandbox', // name given by us for the written dockerfile
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            CMD: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            HostConfig: {
                Binds: [ // Mounting the project directory into the container
                    `./projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [
                        {
                            HostPort: "0"
                        }
                    ]
                },
                ExposedPorts: {
                    "5173/tcp": {}
                },
                Env: [
                    "HOST=0.0.0.0"
                ]
            }
        });

        console.log("Container created with id: ", container.id);
        await container.start();
        console.log("Container started successfully");
    } catch (error) {
        console.log("Error while creating the container: ", error);
    }

};