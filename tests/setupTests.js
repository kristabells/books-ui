/*
 * This file is for setting up tests only
 */
import axe from "axe-core";
import {cleanup} from '@testing-library/react';
import { printReceived, matcherHint } from 'jest-matcher-utils';

// Cleanup the document.body after each test
afterEach(cleanup);

// Mock axios
jest.mock("axios");

// Expose a global axe checker function
global.axeChecker = () => {
    if (!document.body.innerHTML || document.body.innerHTML.length === 0) {
        throw "No document.body.innerHTML content was found to run axe checker";
    } else {
        console.log("running axeChecker() with: ", document.body.innerHTML.substring(0, Math.min(document.body.innerHTML.length, 500)));
        return new Promise((resolve, reject) => {
            axe.run(document.body, (err, results) => {
            if (err) throw err;
        resolve(results);
    })
    });
    }
};

// Extend jest
const toHaveNoViolations = {
    toHaveNoViolations (results) {
        const violations = results.violations;

        if (typeof violations === 'undefined') {
            throw new Error('No violations found in aXe results object')
        }

        const reporter = violations => {
            if (violations.length === 0) {
                return []
            }

            const lineBreak = '\n\n';
            const horizontalLine = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';

            return violations.map(violation => {
                const htmlAndTarget = violation.nodes.map(node => {
                    const selector = node.target.join(', ');
            return (
                `Expected the HTML found at $('${selector}') to have no axe violations:` +
                lineBreak +
                node.html
            );
        }).join(lineBreak);

            return (
                htmlAndTarget +
                lineBreak +
                `Received:` +
                lineBreak +
                printReceived(`${violation.help} (${violation.id})`) +
                lineBreak +
                `Try fixing it with this help: ${violation.helpUrl}`
            )
        }).join(lineBreak + horizontalLine + lineBreak)
        };

        const formatedViolations = reporter(violations);
        const pass = formatedViolations.length === 0;

        const message = () => {
            if (pass) {
                return
            }
            return matcherHint('.toHaveNoViolations') +
                '\n\n' +
                `${formatedViolations}`
        };

        return { actual: violations, message, pass };
    }
};

expect.extend(toHaveNoViolations);