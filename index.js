// Calling the regl module with no arguments creates a full screen canvas and
// WebGL context, and then uses this context to initialize a new REGL instance
const regl = require('regl')()

// Calling regl() creates a new partially evaluated draw command
const draw = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
  precision mediump float;
  uniform float w, h, t;

  void main() {
    vec2 p = gl_FragCoord.xy / vec2(w, h);
    gl_FragColor = vec4(p.x, p.y, sin(t * 0.02)+1.0, 1.0);
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    position: [
      -0.5, -0.5,
      0.5, -0.5,
      0, 0.5]
    },


    uniforms: {
      // This defines the color of the triangle to be a dynamic variable
      t: regl.context('tick'),
      w: regl.context('viewportWidth'),
      h: regl.context('viewportHeight'),
    },

    // This tells regl the number of vertices to draw in this command
    count: 3
  })

  // regl.frame() wraps requestAnimationFrame and also handles viewport changes
  regl.frame(({tick}) => {
    // clear contents of the drawing buffer
    regl.clear({
      color: [0, 0, 0, 1.0],
      depth: 1
    })

    // draw a triangle using the command defined above
    draw();
  })
