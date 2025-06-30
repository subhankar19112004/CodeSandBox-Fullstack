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
                    `${process.cwd()}/../projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {    // Exposing the port
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
        container.exec({
            Cmd: ["/bin/bash"],
            User: "sandbox",
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            
        }, (err, exec) => {
            if (err) {
                console.log("Error while executing command: ", err);
                return;
            }
            console.log("Command executed successfully");
            exec.start({ hijack: true}, (err, stream) => {
                if(err) {
                    console.log("Error while hijacking the stream: ", err);

                    return; 
                }
                console.log("Stream hijacked successfully");
                // processStream(stream, socket);
                // socket.on("shell-input", (data) => {
                //     console.log("Shell input received: ", data);
                //     stream.write("pwd\n", (err) => {
                //         if (err) {
                //             console.log("Error while writing to the stream: ", err);
                //             return;
                //         } else {
                //             console.log("Data written to the stream successfully");
                //         }
                //     });
                // })
            })
        })
    } catch (error) {
        console.log("Error while creating the container: ", error);
    }

};

// function processStream( stream, socket){
//     let buffer = Buffer.from('');
//     stream.on('data', (data) => {
//         buffer = Buffer.concat([buffer, data]);
//         socket.emit("shell-output", buffer.toString());
//         buffer = Buffer.from('');
//     });

//     stream.on('end', () => {
//         console.log("Stream ended");
//         socket.emit("shell-output", "Stream ended");
//     });

//     stream.on('error', (error) => {
//         console.log("Stream error: ", error);
//         socket.emit("shell-output", "Stream error: " + error);
//     });  
// }