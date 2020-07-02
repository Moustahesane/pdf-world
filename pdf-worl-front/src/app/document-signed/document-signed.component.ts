import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
enum PAGEA4 {
  Width = 595,
  Height = 842

}
@Component({
  selector: 'app-document-signed',
  templateUrl: './document-signed.component.html',
  styleUrls: ['./document-signed.component.scss']
})
export class DocumentSignedComponent implements OnInit {

  canvaContainer;
  signatureContext;
  $canvas
  canvasOffset // $canvas.offset();
  offsetX // //canvasOffset.left;
  offsetY // canvasOffset.top;
  scrollX //= $canvas.scrollLeft();
  scrollY // = $canvas.scrollTop();
  cw //= canvas.width;
  ch //= canvas.height;
  isDown = false;
  lastX;
  lastY;
  PI2 = Math.PI * 2;
  signatureHoloder;
  stdRadius = 10;
  draggingsignature = {
    x: -1,
    y: -1
  };
  isSingAdded: boolean = false;
  image: HTMLImageElement;
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    this.setupCanva();
  }

  setupCanva() {

    this.canvaContainer = document.getElementById("canvaContainer") as HTMLCanvasElement;
    this.setDimensions(PAGEA4.Height, PAGEA4.Width);
    let $canvas = this.$canvas = $("#canvaContainer");
    this.canvasOffset = $canvas.offset();
    this.offsetX = this.canvasOffset.left;
    this.offsetY = this.canvasOffset.top;
    this.scrollY = this.$canvas.scrollTop();
    this.scrollX = this.$canvas.scrollLeft();
    this.signatureContext = this.canvaContainer.getContext("2d");
    let self = this;
    $canvas.mousemove(function (e) {
      // self.handleMouseMove(e);
 
if(self.isDown)
{

      // tell the browser we'll handle this event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      let mouseX = e.clientX - self.offsetX;
      let mouseY = e.clientY - self.offsetY;



      // calculate how far the mouse has moved
      // since the last mousemove event was processed
      let dx = mouseX - self.lastX;
      let dy = mouseY - self.lastY;

      // reset the lastX/Y to the current mouse position
      self.lastX = mouseX;
      self.lastY = mouseY;

      // change the target signatureHoloder position by the 
      // distance the mouse has moved since the last
      // mousemove event
      self.draggingsignature.x += dx;
      self.draggingsignature.y += dy;

      // redraw all the signatureHoloder
      self.signatureContext.y = self.draggingsignature.y;
      self.signatureContext.x = self.draggingsignature.x;
      self.signatureContext.clearRect(self.lastX, self.lastY, self.signatureContext.width, self.signatureContext.height);
      self.signatureContext.x = self.lastX,self.signatureContext.y = self.lastY;
      self.drawSignature(self.image);
      
      
    }
      
    })

  $canvas.mouseup(function(e) {
    // self.handleMouseMove(e);

  })

  $canvas.mousedown(function(e) {


    e.preventDefault()
    e.stopPropagation();
    console.log(self.signatureContext);
    if (!self.isSingAdded) {
      self.lastX = e.clientX - this.offsetLeft
      self.lastY = e.clientY - this.offsetTop
      console.log(self.lastX + '|' + e.clientY)
      $("#fileupload").trigger("click");
      $("#fileupload").click(function (e) {
        console.log('log')
      })
    } else {
      self.isDown = true;
    }


  })


}
setDimensions(height, width) {
  this.ch = this.canvaContainer.height = height;
  this.cw = this.canvaContainer.width = width;
}


drawSignature(url)
{
  let image = new Image();

  let self = this;
  console.log("image");
  // When the image has loaded, draw it to the canvas
  image.onload = () => {
    console.log(self.lastX + '|' + self.lastY)
    this.image = image;
    self.signatureContext.drawImage(image, self.lastX, self.lastY);
    console.log(self.signatureContext);
    self.isSingAdded = true;
    
  }

  // Now set the source of the image that we want to load
  image.src = url;

}

fileOnChange(e){

  console.log("image");
  window.URL = window.URL || window.webkitURL;
  const file = e.target.files[0];
  // Create a data URL from the image file
  let imageURL = window.URL.createObjectURL(file);
  this.drawSignature(imageURL);









}

}
