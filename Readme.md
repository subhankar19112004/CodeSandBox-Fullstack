// Importing the Dockerode package to interact with Docker from Node.js
import Docker from "dockerode";

// Create an instance of Docker client to interact with Docker
const docker = new Docker();

// Function to handle container creation
export const handleContainerCreate = async (projectId, socket) => {
    // Log the received project ID for debugging
    console.log("Project id recieved for container create: ", projectId);

    try {
        // Create a new Docker container with the provided configuration
        const container = await docker.createContainer({
            Image: 'sandbox', // The name of the Docker image (sandbox is a custom image in this case)
            AttachStdin: true,  // Enable stdin for interaction with the container
            AttachStdout: true, // Enable stdout to capture output from the container
            AttachStderr: true, // Enable stderr to capture error output from the container
            CMD: ['/bin/bash'], // Command to run inside the container (bash shell in this case)
            Tty: true, // Allocate a pseudo-TTY for interaction
            User: "sandbox", // The user to run the command as inside the container
            HostConfig: {
                Binds: [  //Mount the local project directory into the container
                    `${process.cwd()}/../projects/${projectId}:/home/sandbox/app` // Mounts the directory as /home/sandbox/app in the container
                ],
                PortBindings: {
                    "5173/tcp": [ // Bind container port 5173 to a host port
                        {
                            HostPort: "0" // Let Docker assign a random host port
                        }
                    ]
                },
                ExposedPorts: {
                    "5173/tcp": {} // Expose port 5173 from the container
                },
                Env: [
                    "HOST=0.0.0.0" // Set environment variable to allow listening on all interfaces
                ]
            }
        });

        // Log the ID of the created container
        console.log("Container created with id: ", container.id);

        // Start the container after it's been created
        await container.start();
        console.log("Container started successfully");

        // Execute the bash shell inside the container
        container.exec({
            Cmd: ["/bin/bash"], // Command to run inside the container (bash shell)
            User: "sandbox", // Run the command as the "sandbox" user
            AttachStdin: true, // Allow interactive stdin
            AttachStdout: true, // Capture the container's stdout
            AttachStderr: true, // Capture the container's stderr
            
        }, (err, exec) => {
            // Handle errors in the execution command
            if (err) {
                console.log("Error while executing command: ", err);
                return;
            }
            console.log("Command executed successfully");

            // Start the exec command and hijack the stream for interaction
            exec.start({ hijack: true}, (err, stream) => {
                // Handle errors in the stream hijacking
                if(err) {
                    console.log("Error while hijacking the stream: ", err);
                    return;
                }
                console.log("Stream hijacked successfully");

                // Listen for input from the client and send it to the container's shell
                socket.on("shell-input", (data) => {
                    console.log("Shell input received: ", data);
                    stream.write(data + "\n"); // Send the input to the container's shell
                })
            })
        })
    } catch (error) {
        // Catch any errors while creating the container and log them
        console.log("Error while creating the container: ", error);
    }
};

// Function to process the output stream from the container
function processStream(stream, socket){
    let buffer = Buffer.from(''); // Create a buffer to store data chunks from the stream

    // When data is received from the container's output stream
    stream.on('data', (data) => {
        buffer = Buffer.concat([buffer, data]); // Append the received data to the buffer
        socket.emit("shell-output", buffer.toString()); // Send the output back to the client
        buffer = Buffer.from(''); // Reset the buffer after sending the output
    });

    // When the stream ends, log and notify the client
    stream.on('end', () => {
        console.log("Stream ended");
        socket.emit("shell-output", "Stream ended"); // Inform the client that the stream ended
    });

    // Handle any errors in the stream
    stream.on('error', (error) => {
        console.log("Stream error: ", error);
        socket.emit("shell-output", "Stream error: " + error); // Send the error message to the client
    });
}
 