const { LOGGING_LEVEL } = require('../common/config');
import {RequestObject, ResponseObject} from "../types/types";
const process = require("process");

type LoggingLevel = "0" | "1" | "2" | "3" | "4";

class Logger {
    protected readonly level: LoggingLevel = LOGGING_LEVEL as LoggingLevel;

    protected request: RequestObject;
    protected response: ResponseObject;

    constructor(request: RequestObject, response: ResponseObject) {
        this.request = request;
        this.response = response;
    }

    log(): void {
        process
            .on('uncaughtException', (err: Error) => {
                // process.stderr.write(err, 'Uncaught Exception thrown');
                process.exit(1);
            });
        throw Error("Oops");

        console.info("The level of logging is: " + this.level);
        console.info("URL: " + this.request.originalUrl);
        console.info("Params: " + JSON.stringify(this.request.params));
        console.info("Body: " + JSON.stringify(this.request.body));
        console.info("Response status: " + this.response.statusCode);
    }
    async handleErrors(callback: Function) {
        

            callback();
            this.log();
        
    }
}

module.exports = Logger;