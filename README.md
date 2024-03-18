# Note Taking CLI Application

This project is a CLI application designed for taking notes. It allows users to create, read, update, and delete notes directly from the terminal.

## Core Modules

This application uses several core Node.js modules:

-   [fs](https://nodejs.org/api/fs.html): The `fs` module provides an API for interacting with the file system. It is used in this project to read and write note data to `dbStore.json`.

-   [yargs](https://www.npmjs.com/package/yargs): Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface. It's used in this project to handle command line arguments in `entry-point.js`.

-   [open](https://www.npmjs.com/package/open): Open is a module that allows you to open stuff like URLs, files, executables. It's used in this project to open URLs in the user's preferred browser.

-   [http](https://nodejs.org/api/http.html): The `http` module provides a set of functions and classes for building HTTP servers and making HTTP requests. In this project, it's used in `web-utils.js` to make HTTP requests.

## Project Structure

The project is structured as follows:

-   `entry-point.js`: The entry point of the application.
-   `src/`: Contains the main source code for the application.
    -   `command.js`: Handles the command line commands.
    -   `db.js`: Manages the database operations.
    -   `notes-utils.js`: Contains utility functions for handling notes.
    -   `web-utils.js`: Contains utility functions for creating a web server.
-   `dbStore.json`: The main database file where notes are stored.
-   `template.html`: A template HTML file.

To run the application, use the following command:

## Getting Started

Follow these steps to get started with this application:

1. Clone the git repository:
    ```sh
    git clone git@github.com:pranayahirwar/fem-intro-to-nodejs-v3.git
    ```
2. Navigate to the project folder:
    ```sh
    cd fem-intro-to-nodejs-v3
    ```
3. Run the `npm link` command. This will create a symbolic link between the project and your global node_modules folder. The `bin` field in the `package.json` file defines the name of the app, which is `note` in this case. After running `npm link`, you can access the application using the `note` command:
    ```sh
    npm link
    ```
Now, you can use the `note` command to run the application.