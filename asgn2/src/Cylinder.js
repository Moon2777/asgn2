class Cylinder{
  constructor(){
    this.type = 'Cylinder';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 10;
    this.segment = 20;
    this.matrix = new Matrix4();
  }

  render(){
    var rgba = this.color;
    var size = this.size;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      let angleStep = 360/this.segment;
      for(var theta = 0; theta < 360; theta = theta + angleStep){
        let theta1 = theta;
        let theta2 = theta + angleStep;

        let x1 = Math.cos(theta1 * Math.PI/180);
        let x2 = Math.cos(theta2 * Math.PI/180)

        let y1 = Math.sin(theta1 * Math.PI/180);
        let y2 = Math.sin(theta2 * Math.PI/180);

        draw3DTriangle([x1, y1, 1,  x2, y2, 1,  0, 0, 1]);
        draw3DTriangle([x1, y1, 0,  x2, y2, 0,  0, 0, 0]);

        draw3DTriangle([x1, y1, 0,  x2, y2, 1,  x1, y1, 1]);
        draw3DTriangle([x2, y2, 0,  x1, y1, 0,  x2, y2, 1]);
      }
    }
}
