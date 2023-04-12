const { CucumberJSAllureFormatter } = require("allure-cucumberjs");
const { AllureRuntime } = require("allure-js-commons");

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    const allure = new AllureRuntime({ resultsDir: "allure-results" });
    super(options, allure);
  }
}

module.exports = AllureReporter;
