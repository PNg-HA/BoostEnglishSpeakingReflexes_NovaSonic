# Scenario

Many people want to improve their English speaking reflexes simply to communicate effectively at work, not to master academic grammar or pass expensive language exams. Traditional language courses or private tutors can be costly and time-consuming, creating a barrier for those who just need practical, job-related English skills. AI-powered tools offer a more affordable and flexible alternative, allowing learners to practice real-life conversations anytime, receive instant feedback, and build confidence in speaking. This makes AI a smart choice for professionals who want fast, accessible, and focused language support.

In this blog, we’ll show you how to build your own AI-powered English tutor—designed specifically for everyday professionals who just want to speak up and be heard.

# Workflow

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2xpmockh1tzivf3gkzxt.png)

Workflow: 
- Frontend (React Web Client): Provides the user interface and communicates with the backend via WebSocket for real-time interaction.

- Backend (Python WebSocket Server): Manages client sessions and relays data between the frontend and the AI model.

- Streaming & AI Integration: Streams audio/text to Amazon Bedrock Nova Sonic and returns real-time AI responses to the frontend.

# Prerequisites

## Install dependencies
You will need:

1. Python v3.12+ and pip
2. Node v14+ and NPM
3. AWS boto3
4. AWS credentials that granted Bedrock access

Run the following codes to install pip, AWS CLI for ARM (latest version), NPM (10.9.2) and Node (22.15.1) if you use Ubuntu:

```
sudo apt-get update
sudo apt-get upgrade

# Install pip
sudo apt install python3-pip

# install aws cli latest version
sudo apt install unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 22
# Verify the Node.js version:
node -v # Should print "v22.15.1".
nvm current # Should print "v22.15.1".
# Verify npm version:
npm -v # Should print "10.9.2".
```

# Installation
Currently, the project just works at localhost.
Clone the repo:

```
git clone https://github.com/PNg-HA/BoostEnglishSpeakingReflexes_NovaSonic.git
cd BoostEnglishSpeakingReflexes_NovaSonic
```

## Start the Server
Create a virtual envirionment with venv module
```
cd python-server
python3 -m venv .venv
pip install -r requirements.txt
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ft1byxs64ny43nhc60a3.png)


then set the environment variables.

Windows:

```
$env:AWS_ACCESS_KEY_ID="your-key"
$env:AWS_SECRET_ACCESS_KEY="your-secret-key"
$env:AWS_DEFAULT_REGION="us-east-1"
$env:HOST="localhost"
$env:WS_PORT=8081
$env:HEALTH_PORT=8082
$env:AWS_PROFILE='default'
```

Linux:
```
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
export HOST="localhost"
export WS_PORT=8081
export HEALTH_PORT=8082
export AWS_PROFILE='default'
```

Run the server:
`python3 server.py`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hhnjyumzbxmnsduo6otr.png)

**Note: You must leave this terminal open to run the server. For the later steps, open a new terminal.**

## Start frontend
```
cd BoostEnglishSpeakingReflexes_NovaSonic/react-client
npm install
```

Set the environment variables:
Linux:
`export REACT_APP_WEBSOCKET_URL='ws://localhost:8081'`
Windows:
`$env:REACT_APP_WEBSOCKET_URL = "ws://localhost:8081"`

Start the frontend:
`npm start`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mqznwisdq47cmostscqb.png)

Wait for seconds to load

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hpxoawruycrdvgr2eyji.png)

One website will be opened automatically

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h59ptltjtwzrzkfwo1vk.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f7p0r6mekbaw8ngzl3mj.png)



You can set up the scenario through the prompt by going to Setting button:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rxw6l765lu89k7zbt9d3.png)


# Demo

https://haianh.s3.us-east-1.amazonaws.com/AIEnglishTutor.mp4

# Conclusion
By following this guide, you now have a functional AI-powered English speaking assistant running locally — tailored for professionals who want to improve their communication skills quickly and practically. This solution offers a low-cost, customizable alternative to traditional learning methods by leveraging modern AI models and cloud infrastructure. Whether you're preparing for daily meetings, job interviews, or cross-border collaboration, this tool empowers you to practice speaking English in realistic scenarios, on your own schedule, and with immediate feedback. It's not just a tech project — it's a step toward more confident, fluent, and effective communication in the workplace.
