import { Component } from '@angular/core';
import { FileUtilService } from './services/file-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'downloader';
  constructor(public fileDownloader: FileUtilService) { }
  donwload() {
    this.fileDownloader.getPDF();
  }
}
