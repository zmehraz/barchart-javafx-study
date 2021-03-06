#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
precision highp float;
precision highp int;
#define HIGHP highp
#define MEDIUMP mediump
#define LOWP lowp
#else
#define HIGHP
#define MEDIUMP
#define LOWP
#endif
varying vec2 texCoord0;
varying vec2 texCoord1;
varying LOWP vec4 perVertexColor;
uniform vec2 oinvarcradii;
LOWP float mask(vec2 tco, vec2 oflatdim) {
vec2 absecctco = max(abs(tco) - oflatdim, 0.0010) * oinvarcradii;
float ecclensq = dot(absecctco, absecctco);
float pix = dot(absecctco / ecclensq, oinvarcradii);
return clamp(0.5 + (1.0 + 0.25 * pix * pix - ecclensq) / (2.0 * pix), 0.0, 1.0);
}
void main() {
gl_FragColor = mask(texCoord0, texCoord1) * perVertexColor;
}
