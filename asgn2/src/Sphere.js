class Sphere{

  constructor(){
    this.type = 'Sphere';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 10;
    this.segment = 20;
    this.matrix = new Matrix4();
  }

  render(){
    let change = 0.9;
    var rgba = this.color;
    var size = this.size;

    //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    //var d = this.size/200.0;
    let angleStep1 = 180/this.segment;

    for(var phi = 0; phi < 180; phi = phi + angleStep1){
      rgba[0] = rgba[0] * change;
      rgba[1] = rgba[1] * change;
      rgba[2] = rgba[2] * change;

      //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      let phi1 = phi;
      let phi2 = phi + angleStep1;

      let c1 = Math.sin(phi1 * Math.PI/180);
      let c2 = Math.sin(phi2 * Math.PI/180);

      let z1 = Math.cos(phi1 * Math.PI/180);
      let z2 = Math.cos(phi2 * Math.PI/180);

      let angleStep2 = 360/this.segment;
      for(var theta = 0; theta < 360; theta = theta + angleStep2){
        let theta1 = theta;
        let theta2 = theta + angleStep2;

        let x1 = Math.cos(theta1 * Math.PI/180);
        let x2 = Math.cos(theta2 * Math.PI/180)

        let y1 = Math.sin(theta1 * Math.PI/180);
        let y2 = Math.sin(theta2 * Math.PI/180);

        //sin(p1)cos(t1), sin(p1)sin(t1), cos(t1)
        let p1 = [(c1 * x1) , (c1 * y1) , (z1) ];
        let p2 = [(c1 * x2) , (c1 * y2) , (z1) ];
        //sin(p2)cos(t1), sin(p2)sin(t1), cos(p2)
        let p3 = [(c2 * x1) , (c2 * y1) , (z2) ];
        let p4 = [(c2 * x2) , (c2 * y2) , (z2) ];

        /*if(theta == 0){
          console.log()
        }*/

        //console.log(p1);
        //console.log(p2);
        //console.log(p3);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        draw3DTriangle([p1[0], p1[1], p1[2],  p3[0], p3[1], p3[2],  p4[0], p4[1], p4[2]]);
        draw3DTriangle([p2[0], p2[1], p2[2],  p1[0], p1[1], p1[2],  p4[0], p4[1], p4[2]]);
      }
    }
  }

}
