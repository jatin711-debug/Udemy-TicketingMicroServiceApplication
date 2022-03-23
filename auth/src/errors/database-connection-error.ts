import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Database connection error";
    statusCode = 500;
    constructor() {
        super('Error: Database Error');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }
}