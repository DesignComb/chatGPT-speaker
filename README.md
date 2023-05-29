# Vue3 ChatGPT-Speaker

This is a Single Page Application (SPA) built using Vue 3, TypeScript, and Vite. The main purpose of this application is to convert text responses from the ChatGPT API into speech using the Azure Text to Speech API.

## Prerequisites

Before using this application, you need to obtain API keys from both Azure and OpenAI.

- **Azure Text to Speech**: Follow the [official Microsoft documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started-text-to-speech?tabs=script) to create an Azure account, create a resource for Text to Speech, and get your API key.

- **OpenAI GPT-3.5**: Visit [OpenAI's API overview](https://beta.openai.com/docs/developer-quickstart/) to learn how to sign up, use their services, and obtain your API key.

Please remember to secure these keys appropriately and not to commit them into public version control systems.

## Features

- ChatGPT API integration
- Azure Text to Speech API integration
- Automatic conversion of ChatGPT's text into speech
- Queue management for audio playback
- Play, pause, and clear functionality for the audio queue

## Setup and Installation

Make sure to have Node.js and npm installed on your machine.

1. Clone the repository:

`git clone`

2. Install the dependencies:

`npm install`

3. Run the application:

`npm run dev`


## Usage

The application has a chat interface where you can converse with ChatGPT. The responses from ChatGPT can then be converted into speech using the Azure Text to Speech API.

You can choose to have the speech generated automatically whenever ChatGPT responds, or manually generate the speech by clicking on the "CREATE AUDIO" button.

The generated speech will be added to a queue, where you can play, pause, or clear the audio. The audio queue is sortable, and each audio item can be removed individually.

## Configuration

Insert your Azure and OpenAI API keys into the respective placeholders in the code.

## License

This project is licensed under the terms of the MIT license.
