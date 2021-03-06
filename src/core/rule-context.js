// LICENSE : MIT
"use strict";
const assert = require("assert");
import RuleFixer from "../fixer/rule-fixer-commaner";
import RuleError from "./rule-error";
import {SeverityLevel, getSeverity} from "../shared/rule-severity";

/**
 * This callback is displayed as a global member.
 * @callback ReportCallback
 * @param {ReportMessage} message
 */

/**
 * Rule context object is passed to each rule as `context`
 * @param ruleId
 * @param sourceCode
 * @param {ReportCallback} report
 * @param {Config} textLintConfig
 * @param ruleConfig
 * @returns {*}
 * @constructor
 */
export default function RuleContext(ruleId, sourceCode, report, textLintConfig, ruleConfig) {
    Object.defineProperty(this, "id", {value: ruleId});
    Object.defineProperty(this, "config", {value: textLintConfig});
    const severity = getSeverity(ruleConfig);
    /**
     * report function that is called in a rule
     * @param {TxtNode} node
     * @param {RuleError|any} ruleError error is a RuleError instance or any data
     */
    this.report = function (node, ruleError) {
        assert(!(node instanceof RuleError), "should be `report(node, ruleError);`");
        if (ruleError instanceof RuleError) {
            report({ruleId, node, severity, ruleError});
        } else {
            const level = ruleError.severity || SeverityLevel.error;
            report({ruleId, node, severity: level, ruleError});
        }
    };
    // Const Values
    Object.defineProperty(this, "Syntax", {
        get(){
            return sourceCode.getSyntax();
        }
    });
    this.getFilePath = sourceCode.getFilePath.bind(sourceCode);
    this.getSource = sourceCode.getSource.bind(sourceCode);
    // CustomError object
    this.RuleError = RuleError;
    // fixer
    this.fixer = new RuleFixer();
}
