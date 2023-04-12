# Introduction
This is a test automation project built with Cucumber.js and Playwright. It contains end-to-end tests for a web application.

## Pre-requisites
Before running this project, you need to install Node.js. You can download and install Node.js from the official website https://nodejs.org/en/.

To verify that Node.js is installed, open a terminal and run the following command:

```bash
node -v
```

If Node.js is installed correctly, you should see the version number in the output.

Installation
To install the project dependencies, navigate to the root directory of the project and run the following command:

```bash
npm i
```

This command will install all the dependencies listed in the package.json file. If you encounter any errors, you may need to install Cucumber and Playwright globally.

If you want to generate reports using Allure, you also need to have Java installed on your computer.

Running Tests
To run all the tests, type the following command in the terminal:

```bash
npm run all
```

This command will run all the .feature files in the features directory.

To run a specific test, you can use the @only tag. Add the tag above the scenario you want to run, and then use the following command in the terminal:

```bash
npm run only
```

To run a test and generate the data needed to create the Allure report, use the following command, but you would have Java installed on your machine:

```bash
npm run testWithAllureReport
```

To view the Allure report, use the following command:

```bash
npm run allure
```

To run over Firefox or webkit you need to update a enviroment variable, you can try for example:

```bash
export BROWSER=firefox
```

