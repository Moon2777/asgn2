class Cube{
  constructor(){
    this.type = 'cube';
    this.color = [0, 1, 1, 0];
    this.matrix = new Matrix4();
  }
  render(){
    //var xy = this.position;
    var rgba = this.color;
    //var size = this.size;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    draw3DTriangle([0, 0, 0,  1, 1, 0,  1, 0, 0]);
    draw3DTriangle([0, 0, 0,  0, 1, 0,  1, 1, 0]);

    gl.uniform4f(u_FragColor, rgba[0] *0.9, rgba[1] *0.9, rgba[2] *0.9, rgba[3]);
    draw3DTriangle([0, 1, 0,  0, 1, 1,  1, 1, 1]);
    draw3DTriangle([0, 1, 0,  1, 1, 1,  1, 1, 0]);

    gl.uniform4f(u_FragColor, rgba[0] *0.7, rgba[1] *0.7, rgba[2] *0.7, rgba[3]);
    draw3DTriangle([1, 0, 0,  1, 1, 1,  1, 0, 1]);
    draw3DTriangle([1, 0, 0,  1, 1, 0,  1, 1, 1]);

    gl.uniform4f(u_FragColor, rgba[0] *0.5, rgba[1] *0.5, rgba[2] *0.5, rgba[3]);
    draw3DTriangle([0, 0, 0,  1, 0, 1,  1, 0, 0]);
    draw3DTriangle([0, 0, 0,  1, 0, 1,  0, 0, 1]);

    gl.uniform4f(u_FragColor, rgba[0] *0.3, rgba[1] *0.3, rgba[2] *0.3, rgba[3]);
    draw3DTriangle([0, 1, 0,  0, 0, 1,  0, 1, 1]);
    draw3DTriangle([0, 0, 0,  0, 1, 0,  0, 0, 1]);

    gl.uniform4f(u_FragColor, rgba[0] *0.1, rgba[1] *0.1, rgba[2] *0.1, rgba[3]);
    draw3DTriangle([0, 1, 1,  1, 0, 1,  1, 1, 1]);
    draw3DTriangle([0, 1, 1,  1, 0, 1,  0, 0, 1]);

  }
}
