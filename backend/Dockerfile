FROM ubuntu:22.04

# setup user
RUN useradd -ms /bin/bash sandbox 

# Setup working directory
WORKDIR /home/sandbox

# update the ubuntu machine
RUN apt update && apt upgrade -y

# install nano and curl
RUN apt install nano curl -y


# install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_22 .x | bash - && apt-get install -y nodejs

# configuring terminal to display current working directory
RUN echo "PS1='\w '" >> /home/sandbox/.bashrc 

# Setup 
WORKDIR /home/sandbox/app
