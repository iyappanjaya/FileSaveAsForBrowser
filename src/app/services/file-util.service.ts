import { Injectable } from '@angular/core';

declare const window: any;
@Injectable()

export class FileUtilService {
    getPDF() {
        let content;
        fetch('./assets/dummy.pdf').then((response) => response.blob()).then(blob1 => { content = blob1; });
        this.getNewFileHandle().then((data: any) => {
            this.writeFile(data, content);
        });
    }

    async getNewFileHandle() {
        let handle;
        const opts = {
            id: 'SaveFilePicker',
            suggestedName: 'downloadr_example.pdf',
            types: [{
                description: 'PDF document',
                accept: { 'application/pdf': ['.pdf'] },
            }],
        };
        handle = await window.showSaveFilePicker(opts);
        return handle;
        // if ('showSaveFilePicker' in window) {
        //     const opts = {
        //         id: 'SaveFilePicker',
        //         suggestedName: 'downloadr_example.pdf',
        //         types: [{
        //             description: 'PDF document',
        //             accept: { 'application/pdf': ['.pdf'] },
        //         }],
        //     };
        //     handle = await window.showSaveFilePicker(opts);
        // } else {
        //     // For Chrome 85 and earlier...
        //     const opts = {
        //         type: 'save-file',
        //         accepts: [{
        //             description: 'PDF document',
        //             extensions: ['pdf'],
        //             mimeTypes: ['application/pdf'],
        //         }],
        //     };
        //     handle = window.chooseFileSystemEntries(opts);
        // }
        // return handle;
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
