const { CucumberJSAllureFormatter } = require("allure-cucumberjs");
const { AllureRuntime } = require("allure-js-commons");
const fs = require("fs");

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    const allure = new AllureRuntime({ resultsDir: "allure-results" });

    // Check if "allure-results" directory exists, if not, create it
    if (!fs.existsSync("allure-results")) {
      fs.mkdirSync("allure-results");
    }

    super(options, allure);
  }
}

module.exports = AllureReporter;
