import { CommonModule } from '@angular/common';
import {Overlay, OverlayModule, OverlayRef} from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  ElementRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayElementsComponent } from './overlay-elements/overlay-elements/overlay-elements.component';
declare var MediaRecorder: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, OverlayModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  @ViewChild('recordedVideo')
  recordVideoElementRef!: ElementRef;
  @ViewChild('video')
  videoElementRef!: ElementRef;

  videoElement!: HTMLVideoElement;
  recordVideoElement!: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs!: Blob[];
  isRecording: boolean = false;
  downloadUrl!: string;
  stream!: MediaStream;
  overlayRef!: OverlayRef; 


  constructor(private overlay: Overlay,
    public dialog: MatDialog) {
    }

  async ngOnInit() {
    console.log("start of ngOnInit!!!!!!!!");
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 360
        }
      })
      .then(stream => {
        this.videoElement = this.videoElementRef.nativeElement;
        this.recordVideoElement = this.recordVideoElementRef.nativeElement;

        this.stream = stream;
        this.videoElement.srcObject = this.stream;
      });
  }

  startRecording() {

    //display overlay after start button clicked:
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right().top(),
      hasBackdrop: false
    });
    this.overlayRef.attach(new ComponentPortal(OverlayElementsComponent));

    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    //close overlay
    this.overlayRef.detach();
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }
}
