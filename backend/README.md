# Face Recognition API

This project is a Flask-based API for face recognition that utilizes OpenAI's API and various Python libraries for image processing. The API allows you to upload images, process them to detect faces, and perform other related tasks.

## Table of Contents

- [Installation](#installation)
  - [Linux](#linux)
  - [Windows](#windows)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

### Linux

1. **Open Terminal**: Use your preferred terminal emulator.
2. **Ensure Python is Installed**: Make sure you have Python 3 installed. You can check by running:

```sh
python3 --version
```

3. **Navigate to the Project Directory**: Use `cd` to navigate to the directory where your `requirements.txt` file is located.
4. **Create a Virtual Environment (Optional but recommended)**:

```sh
python3 -m venv venv
source venv/bin/activate
```

5. **Install the Requirements**:

```sh
pip install -r requirements.txt
```

### Windows

1. **Open Command Prompt or PowerShell**: Use the search bar to find cmd or PowerShell.
2. **Ensure Python is Installed**: Make sure you have Python installed. You can check by running:

```sh
python --version
```

3. **Navigate to the Project Directory**: Use `cd` to navigate to the directory where your `requirements.txt` file is located.
4. **Create a Virtual Environment (Optional but recommended)**:

```sh
python -m venv venv
venv\Scripts\activate
```

5. **Install the Requirements**:

```sh
pip install -r requirements.txt
```

## Usage

### Linux

```sh
python3 main.py
```

### Windows

```sh
python main.py
```

## API Endpoints

- POST /image: Wear glasses to your face.
- POST /chat: Chat with AI.

## Environment Variables

1. **Create a .env file in the root of your project to store environment variables**: OPENAI_API_KEY=your_openai_api_key

## License

This `README.md` provides comprehensive installation steps for both Linux and Windows, and includes all the necessary information to set up and use the project.
