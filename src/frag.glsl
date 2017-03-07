precision mediump float;
uniform float w, h, t;

void main() {
  vec2 p = gl_FragCoord.xy / vec2(w, h);
  float osc = sin(t * 0.1);
  gl_FragColor = vec4(1.0, osc, 1.0, 1.0);
}
