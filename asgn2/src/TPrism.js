class Tprism{
  constructor(){
    this.type = 'TPrims';
    this.color = [1.0, 1.0, 1.0, 0];
    this.matrix = new Matrix4();
  }

  render(){
    var rgba = this.color;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    draw3DTriangle([0, 0, 0,  1, 1, 0,  1, 0, 0]);
    draw3DTriangle([0, 0, 1,  1, 1, 1,  1, 0, 1]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);
    draw3DTriangle([1, 1, 0,  1, 0, 0,  1, 1, 1]);
    draw3DTriangle([1, 0, 0,  1, 1, 1,  1, 0, 1]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.6, rgba[1] * 0.6, rgba[2] * 0.6, rgba[3]);
    draw3DTriangle([0, 0, 0,  1, 0, 0,  1, 0, 1]);
    draw3DTriangle([0, 0, 0,  1, 0, 1,  0, 0, 1]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.3, rgba[1] *0.3, rgba[2] *0.3, rgba[3]);
    draw3DTriangle([0, 0, 0,  1, 1, 1,  1, 1, 0]);
    draw3DTriangle([0, 0, 0,  1, 1, 1,  0, 0, 1]);
  }
}
