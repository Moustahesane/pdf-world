import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { fromEvent } from 'rxjs';
import { RestApiServiceService } from '../rest-api-service.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {


  paper;
  ctx;
  lastCor = {
    X: 0,
    Y: 0
  }
  size = {
    H: 300,
    W: 300
  }

  isDown = false;
  paperOffset: any;
  offset = {
    X: 0,
    Y: 0
  };
  scroll = {
    X: 0,
    Y: 0
  };
  isSingAdded: any;
  signFile: any;
  signImage: any;
  draggingsignature: any = {
    x: 0,
    y: 0
  };
  ChossenPdf: any;

  constructor(private rest : RestApiServiceService) { }

  ngOnInit(): void {
    this.paper = document.getElementById('paper') as HTMLCanvasElement;
    this.paper.width = 500;
    this.paper.height = 700;
    this.paper.style = 'background-color: white; margin-left : auto; margin-right : auto;';
    this.ctx = this.paper.getContext('2d');
    const $paper = $('#paper')

    this.paperOffset = $paper.offset();

    this.offset.X = this.paperOffset.left;
    this.offset.Y = this.paperOffset.top;


    this.scroll.Y = $paper.scrollTop();
    this.scroll.X = $paper.scrollLeft();

    let mousemove$ = fromEvent(this.paper, 'mousemove');
    mousemove$.subscribe((e: any) => {
      if (this.isDown) {
        this.onMouseMove(e);

      }

    })


  }

  onMouseDown(e) {

    e.preventDefault()
    e.stopPropagation();
    if (!this.isSingAdded) {
      console.log(this.offset)
      this.lastCor.X = e.clientX - this.offset.X
      this.lastCor.Y = e.clientY - this.offset.Y
      $("#fileupload").trigger("click");

    } else {
      this.isDown = true;
    }
  }
  onMouseUp(e) {
    this.isDown = false;
    if (this.isDown) {

    }

  }
  onMouseMove(e) {
    if (this.isSingAdded && this.isDown) {
      this.lastCor.X = e.clientX - this.offset.X
      this.lastCor.Y = e.clientY - this.offset.Y
      console.log("eee")


      // get the current mouse position
      let mouseX = e.clientX - this.offset.X;
      let mouseY = e.clientY - this.offset.Y;

      // calculate how far the mouse has moved
      // since the last mousemove event was processed
      let dx = mouseX - this.lastCor.X;
      let dy = mouseY - this.lastCor.Y;

      // change the target signatureHoloder position by the 
      // distance the mouse has moved since the last
      // mousemove event
      this.draggingsignature.x += dx;
      this.draggingsignature.y += dy;

      // redraw all the signatureHoloder
      this.ctx.y = this.draggingsignature.y;
      this.ctx.x = this.draggingsignature.x;
      

      this.ctx.clearRect(0,0,this.paper.width,this.paper.height);


      let imageURL = window.URL.createObjectURL(this.signFile);
      this.drawSignature(imageURL)

    }
  }
  onFileChange(e) {
    window.URL = window.URL || window.webkitURL;
    const file = this.signFile = e.target.files[0];

    // Create a data URL from the image file
    let imageURL = window.URL.createObjectURL(file);
    this.drawSignature(imageURL);
    this.isSingAdded = true;
  }
  drawSignature(imageURL: string) {
    let image = new Image();
    image.onload = () => {
      this.signImage = image;
      console.log('ok')
      this.size.W = image.width;
      this.size.H = image.height;
      
      this.ctx.drawImage(image, this.lastCor.X - (image.width / 2), this.lastCor.Y - (this.signImage.height / 2));
        }
    image.src = imageURL;
  }

  uploadDocument(){
   this.rest.signDocument(this.ChossenPdf,this.signFile,this.lastCor.X,this.lastCor.Y).subscribe(res => {
    let elem = document.getElementById('tele') as HTMLAnchorElement;
    elem.download=`file${new Date().getTime()}.pdf`
    elem.href = 'data:application/pdf;base64,'+res['base64']; 
   })


  }
  uploadDocumentchange(e){
    this.ChossenPdf = e.target.files[0];
   }
}
