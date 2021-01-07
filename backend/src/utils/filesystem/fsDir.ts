/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from 'fs';
import { MD5 } from 'crypto-js';


export const fsDirWithChecksum = (directory: string, extension: string): string[] => {
    let content: string[] = [];

    fs.readdirSync(directory).forEach(file => { 
        const fullname = directory+'/'+file; 
        const stat = fs.statSync(fullname); 

        if (stat && stat.isDirectory()) { 
            content = content.concat(fsDir(fullname, extension));
        } else {
            if (file.endsWith(extension)) {
                const fileChunk: string = file.slice(0, 2048);
                const buf: ArrayBuffer = new ArrayBuffer(fileChunk.length*2);
                const bufView = new Uint16Array(buf);
                for (let i=0; i<fileChunk.length; i++) {
                  bufView[i] = fileChunk.charCodeAt(i);
                }
                const uint8array = new Uint8Array(buf);
                const text: string = (uint8array.toString());
                const checksum: string = MD5(text).toString();
                content.push(file + '|' + checksum);
            } 
        }
    }); 

    return content;
};

export const fsDir = (directory: string, extension: string): string[] => {
    let content: string[] = [];

    fs.readdirSync(directory).forEach(file => { 
        const fullname = directory+'/'+file; 
        const stat = fs.statSync(fullname); 

        if (stat && stat.isDirectory()) { 
            content = content.concat(fsDir(fullname, extension));
        } else {
            if (file.endsWith(extension)) content.push(file); 
        }
    }); 

    return content;
};
