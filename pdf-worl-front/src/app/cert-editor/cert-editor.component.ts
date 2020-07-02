import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.slim'


const draggables = document.querySelectorAll('.draggable')
enum PAGEA4 {
  Width = 595,
  Height = 842

}
@Component({
  selector: 'app-cert-editor',
  templateUrl: './cert-editor.component.html',
  styleUrls: ['./cert-editor.component.scss'],

})
export class CertEditorComponent implements OnInit {



  canvaContainer;
  context;
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
    x : -1,
    y : -1
  };

constructor() { }

ngOnInit(): void {

  this.setupCanva()


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
  this.context = this.canvaContainer.getContext("2d");
  let self=this;
  $canvas.mousemove(function(e){
    self.handleMouseMove(e);

  })


}

setDimensions(height, width) {
  this.ch = this.canvaContainer.height = height;
  this.cw = this.canvaContainer.width = width;

}


drawSignature() {
  this.context.clearRect(0, 0, this.cw, this.ch);
  
      var signature = this.signatureHoloder;
      this.context.beginPath();
      this.context.arc(signature.x, signature.y, signature.radius, 0, this.PI2);
      this.context.closePath();
      this.context.fillStyle = signature.color;
      this.context.fill();
  
}

handleMouseDown(e) {
  // tell the browser we'll handle this event
  e.preventDefault();
  e.stopPropagation();

  // save the mouse position
  // in case this becomes a drag operation
  this.lastX = e.clientX - this.offsetX;
  this.lastY = e.clientY - this.offsetY;

  // hit test all existing signatureHoloder
  let hit = -1;
  for (let i = 0; i < this.signatureHoloder.length; i++) {
      let circle = this.signatureHoloder[i];
      let dx = this.lastX - circle.x;
      let dy = this.lastY - circle.y;
      if (dx * dx + dy * dy < circle.radius * circle.radius) {
          hit = i;
      }
  }

  // if no hits then add a circle
  // if hit then set the isDown flag to start a drag
  if (hit < 0) {
      this.signatureHoloder.push({
          x: this.lastX,
          y: this.lastY,
          radius: this.stdRadius,
          
      });
      this.drawSignature();
  } else {
      this.draggingsignature = this.signatureHoloder;
      this.isDown = true;
  }

}

handleMouseUp(e) {

  // tell the browser we'll handle this event
  e.preventDefault();
  e.stopPropagation();

  // stop the drag
  this.isDown = false;
}

handleMouseMove(e) {


  // if we're not dragging, just exit
  if (!this.isDown) {
      
      return;
  }
  
  // tell the browser we'll handle this event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  let mouseX = e.clientX - this.offsetX;
  let mouseY = e.clientY - this.offsetY;



  // calculate how far the mouse has moved
  // since the last mousemove event was processed
  let dx = mouseX - this.lastX;
  let dy = mouseY - this.lastY;

    // reset the lastX/Y to the current mouse position
    this.lastX = mouseX;
    this.lastY = mouseY;

  // change the target signatureHoloder position by the 
  // distance the mouse has moved since the last
  // mousemove event
  this.draggingsignature.x += dx;
  this.draggingsignature.y += dy;

  // redraw all the signatureHoloder
  this.drawSignature();
}


uploadSignateur(){ }



}
