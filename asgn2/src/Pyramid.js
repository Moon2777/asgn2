class Pyramid{
  constructor(){
    this.type = 'TPrims';
    this.color = [1.0, 1.0, 1.0, 0];
    this.matrix = new Matrix4();
  }
  render(){
    var rgba = this.color;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    let p1 = [0, 0, 0];
    let p2 = [1, 0, 0];
    let p3 = [0.5, 0.5, 0];
    let p4 = [0.5, 0, 1];

    draw3DTriangle([ p1[0], p1[1], p1[2],  p2[0], p2[1], p2[2],  p3[0], p3[1], p3[2] ]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);
    draw3DTriangle([ p1[0], p1[1], p1[2],  p2[0], p2[1], p2[2],  p4[0], p4[1], p4[2] ]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.5, rgba[1] * 0.5, rgba[2] * 0.5, rgba[3]);
    draw3DTriangle([ p1[0], p1[1], p1[2],  p3[0], p3[1], p3[2],  p4[0], p4[1], p4[2] ]);

    gl.uniform4f(u_FragColor, rgba[0] * 0.3, rgba[1] * 0.3, rgba[2] * 0.3, rgba[3]);
    draw3DTriangle([ p2[0], p2[1], p2[2],  p3[0], p3[1], p3[2],  p4[0], p4[1], p4[2] ]);

  }
}
