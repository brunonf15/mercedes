# Introduction
Welcome to the Mercedes Benz Technical Challenge test automation project! This project utilizes Cucumber.js, Playwright, and Allure to perform end-to-end testing of a web application. 

![Captura de Tela 2023-04-15 às 09 20 06](https://user-images.githubusercontent.com/5133283/232200291-84cf8bdd-24de-45de-9c91-ec48b50701a0.png)

It is specifically designed to address the technical challenge presented by Mercedes Benz, providing a comprehensive framework for automated testing. With this project, you can easily write and execute tests to ensure the quality and reliability of your web application.

## Pre-requirements
Before running this project, you need to install Node.js. If you don't have it already, you can download and install Node.js from the official website: https://nodejs.org/en/.

To verify if Node.js is installed correctly, open a terminal and run the following command:

```bash
node -v
```

If Node.js is installed correctly, you should see the version number in the output.

## Installation
To install the project dependencies, navigate to the root directory of the project and run the following command:

```bash
npm i
```

This command will install all the dependencies listed in the package.json file. If you encounter any errors, you may need to install Cucumber and Playwright globally.

## Running Tests
To run all the tests, type the following command in the terminal:

```bash
npm run all
```

This command will run all the .feature files in the features directory.

## Reports

To generate the data needed to create the Allure report and view the test results, you need to have Java installed on your machine. You can run the following command:

```bash
npm run testWithAllureReport
```

To generate reports using Allure, you also need to have Java installed on your computer. You can run the following command:

```bash
npm run allure
```

![Captura de Tela 2023-04-15 às 09 24 46](https://user-images.githubusercontent.com/5133283/232200517-9c0f4dd1-4e03-4425-acef-866bbaff2502.png)

## Browsers

You can choose to run the tests on different browsers such as Firefox, Webkit, or Chromium by updating the environment variable. For example:

```bash
export BROWSER=chromium

export BROWSER=firefox

export BROWSER=webkit

```

## Debug

You can enable or disable the Playwright debugger by updating the environment variable. For example:

```bash

export PWDEBUG=1

export PWDEBUG=0

```

You can also enable or disable the headless mode, which is disabled by default. For example:

```bash

export HEADLESS=true

export HEADLESS=false
```

Feel free to customize these settings as per your testing requirements.

Happy testing!

## Demo video

![Alt Text](https://user-images.githubusercontent.com/5133283/232191657-eb5b1adb-c3c6-4846-b96c-3a9bf2af8304.mp4)