const { LOGGING_LEVEL } = require('../common/config');
import {RequestObject, ResponseObject} from "../types/types";
const process = require("process");
const onFinished = require('on-finished');

type LoggingLevel = "0" | "1" | "2" | "3" | "4";

class Logger {
    protected readonly level: LoggingLevel = LOGGING_LEVEL as LoggingLevel;

    protected request: RequestObject;
    protected response: ResponseObject;
    protected next: Function;

    constructor(request: RequestObject, response: ResponseObject, next: Function) {
        this.request = request;
        this.response = response;
        this.next = next;
    }

    handleUncaughtExceptions() {
        process.on('uncaughtException', (error: Error, origin: string) => {
            console.error(`captured error: ${error.message}`);
            // fs.writeFileSync...
            process.exit(1);
        });
    }

    handleUnhandledRejections() {
        process.on('unhandledRejection', () => {
            console.error(`captured error`);
            // fs.writeFileSync...
            process.exit(1);
        });
    }

    logParams(): void {
        console.info("Params: " + JSON.stringify(this.request.params));
    }

    logURL(): void {
        console.info("URL: " + this.request.originalUrl);
    }

    logBody(): void {
        console.info("Body: " + JSON.stringify(this.request.body));
    }

    logLoggingLevel(): void {
        console.info("The level of logging is: " + this.level);
    }

    logStatus(res?: ResponseObject): void {
        if (res) {
            console.info("Response status: " + res.statusCode);
        }
    }
}

module.exports = Logger;