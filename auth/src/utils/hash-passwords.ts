import { scrypt, randomBytes } from "crypto";
import { promisify } from "node:util";
const scryptAsync = promisify(scrypt);

export class Password{

    static async tohash(password:string){
        const salt = randomBytes(8).toString('hex');
        const buff = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buff.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword:string,suppliedPassword:string){
        const [hashedPassword, salt] = storedPassword.split('.');
        const buff = (await scryptAsync(hashedPassword, salt, 64)) as Buffer;
        
        return buff.toString('hex') === storedPassword;
    }

}