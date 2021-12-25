const { LOGGING_LEVEL } = require('../common/config');
import {RequestObject, ResponseObject} from "../types/types";
const process = require("process");
const onFinished = require('on-finished');
var fs = require('fs');

type LoggingLevel = "0" | "1" | "2" | "3" | "4";

const writeStream = fs.createWriteStream("./output.txt");


class Logger {
    protected readonly level: LoggingLevel = LOGGING_LEVEL as LoggingLevel;

    protected request: RequestObject;
    protected response: ResponseObject;
    protected next: Function;

    protected data: string = "";

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
        if (+this.level > 1) {
            const {params} = this.request;
            console.info("Params: " + JSON.stringify(params));
            writeStream.write("Params: " + JSON.stringify(params) + "\n");
        }
        
    }

    logURL(): void {
        if (+this.level > 1) {
            const {originalUrl} = this.request;
            console.info("URL: " + originalUrl);
            writeStream.write("URL: " + JSON.stringify(originalUrl) + "\n");
        }
        
    }

    logBody(): void {
        if (+this.level > 1) {
            const {body} = this.request;
            console.info("Body: " + JSON.stringify(body));
            writeStream.write("Body: " + JSON.stringify(body) + "\n");
        }
        
    }

    logLoggingLevel(): void {
        if (+this.level > 1) {
            const {level} = this;
            console.info("The level of logging is: " + level);
            writeStream.write("The level of logging is: " + JSON.stringify(level) + "\n");
        }
        
    }

    logStatus(res?: ResponseObject): void {
        if (res && +this.level > 1) {
            const {statusCode} = res;
            console.info("Response status: " + statusCode);
            writeStream.write("Response status: " + JSON.stringify(statusCode) + "\n\n");
        }
    }

    logError(error: string): void {
        console.info("Params: " + JSON.stringify(this.request.params));
        console.info("URL: " + JSON.stringify(this.request.originalUrl));
        console.info("Body: " + JSON.stringify(this.request.body));
        console.info("Response status: " + this.response.statusCode);
        console.info("Logging level: " + this.level);
        console.error("Error: " + error);
    }
}

module.exports = Logger;