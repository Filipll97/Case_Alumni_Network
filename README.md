# Alumni Network

Alumni Network is a full-featured React application that facilitates interaction and management within an alumni community. The application leverages the Context API for state management and Keycloak for user authentication. The system provides a suite of features such as user profiles, timeline, user dashboard, creation and editing of posts, group and topic management, as well as event handling.

## Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [License](#license)


## Overview
The Alumni Network application offers the following key functionalities:

- Secure user authentication via Keycloak
- Context API-based state management
- Dynamic, searchable timeline for posts and events
- Comprehensive user profiles and settings
- Personalized user dashboard
- Group and topic management
- Creation and editing of posts
- Calendar view for event tracking
- Reusable components for modularity

## Requirements
Before you begin, ensure your development environment meets the following requirements:

- Node.js (>= 14.x.x)
- npm (>= 6.x.x)
- Keycloak server with client configuration

## Installation
Follow these steps to set up and run the Alumni Network application locally:

1. Clone the repository:

    git clone https://github.com/Filipll97/Case_Alumni_Network.git

2. Navigate to the project directory:

    cd .\alumni-network-ui\

3. Install the required dependencies:

    npm install

4. Start the development server:

    npm start

The application should now be running on `http://localhost:3000`.

## Usage

[View the User Guide](USER_GUIDE.md)

1. Visit `http://localhost:3000` in your browser.
2. Log in with your Keycloak credentials.
3. Explore the application features like timeline, user profiles, groups, topics, and events.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
