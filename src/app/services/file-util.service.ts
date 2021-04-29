
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const window: any;
@Injectable()

export class FileUtilService {
    public fileHandle: any;
    constructor(public http: HttpClient) {
    }
    getPDF() {
        this.getNewFileHandle().then((data: any) => {
            this.writeFile(data, 'Hello Welcome !');
        });
    }

    async getNewFileHandle() {
        const opts = {
            id: 'SaveFilePicker',
            suggestedName: 'downloadr_example.txt',
            types: [{
                description: 'Text file',
                accept: { 'text/plain': ['.txt'] },
            }],
        };
        const handle = await window.showSaveFilePicker(opts);
        return handle;
    }
    async writeFile(fileHandle, contents) {
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    }
}
