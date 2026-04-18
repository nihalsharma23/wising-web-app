import React, { useRef, useEffect, useMemo } from 'react';

interface LaserFlowProps {
  color?: string;
  width?: number;
  height?: number;
  flowSpeed?: number;
  flowStrength?: number;
  wispDensity?: number;
  fogIntensity?: number;
  wispIntensity?: number;
  decay?: number;
  verticalBeamOffset?: number;
  horizontalBeamOffset?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uFlowSpeed;
  uniform float uFlowStrength;
  uniform float uWispDensity;
  uniform float uFogIntensity;
  uniform float uWispIntensity;
  uniform float uDecay;
  uniform float uVerticalOffset;
  uniform float uHorizontalOffset;
  uniform float uDirection; // 0 = horizontal, 1 = vertical
  uniform float uSharpEnds;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    
    float beamAxis, crossAxis;
    if (uDirection < 0.5) {
      beamAxis = uv.x + uHorizontalOffset;
      crossAxis = uv.y + uVerticalOffset;
    } else {
      beamAxis = uv.y + uVerticalOffset;
      crossAxis = uv.x + uHorizontalOffset;
    }
    
    float center = 0.5;
    float dist = abs(crossAxis - center);
    
    // Core beam — widened and brighter
    float coreBeam = exp(-dist * 40.0) * 1.4;
    
    // Inner glow — wider spread
    float innerGlow = exp(-dist * 14.0) * 0.7;
    
    // Outer soft glow
    float outerGlow = exp(-dist * 4.0) * uFogIntensity;
    
    // Flowing wisps
    float time = uTime * uFlowSpeed;
    vec2 wispUV;
    if (uDirection < 0.5) {
      wispUV = vec2(beamAxis * 4.0 - time, crossAxis * uWispDensity * 10.0);
    } else {
      wispUV = vec2(crossAxis * uWispDensity * 10.0, beamAxis * 4.0 - time);
    }
    float wisps = fbm(wispUV) * uWispIntensity;
    
    // Secondary wisp layer
    vec2 wispUV2;
    if (uDirection < 0.5) {
      wispUV2 = vec2(beamAxis * 8.0 + time * 0.7, crossAxis * 15.0);
    } else {
      wispUV2 = vec2(crossAxis * 15.0, beamAxis * 8.0 + time * 0.7);
    }
    float wisps2 = fbm(wispUV2) * uWispIntensity * 0.5;
    
    // Combine wisp effect near beam
    float wispMask = exp(-dist * 8.0);
    float wispEffect = (wisps + wisps2) * wispMask;
    
    // Pulsation — stronger oscillation
    float pulse = 0.7 + 0.3 * sin(time * 6.0 + beamAxis * 12.0);
    
    // Combine with flow strength
    float intensity = (coreBeam + innerGlow + outerGlow + wispEffect) * pulse * uFlowStrength;
    
    // Decay — fade at edges along beam axis
    float edgeFade = 1.0;
    if (uSharpEnds < 0.5) {
      edgeFade = smoothstep(0.0, 0.06, beamAxis) * smoothstep(1.0, 1.0 - 0.06 * uDecay, beamAxis);
    }
    intensity *= edgeFade;
    
    vec3 finalColor = uColor * intensity;
    
    // Bright white-hot core
    finalColor += vec3(1.0) * coreBeam * 0.35 * pulse * edgeFade;
    
    gl_FragColor = vec4(finalColor, intensity * 0.95);
  }
`;

const LaserFlow: React.FC<LaserFlowProps> = ({
  color = '#10b981',
  width = 300,
  height = 6,
  flowSpeed = 0.30,
  flowStrength = 0.75,
  wispDensity = 0.8,
  fogIntensity = 0.3,
  wispIntensity = 1.5,
  decay = 2.4,
  verticalBeamOffset = 0,
  horizontalBeamOffset = 0,
  direction = 'horizontal',
  sharpEnds = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const colorVec = useMemo(() => {
    const hex = color.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16) / 255,
      parseInt(hex.substring(2, 4), 16) / 255,
      parseInt(hex.substring(4, 6), 16) / 255,
    ];
  }, [color]);

  const canvasWidth = direction === 'horizontal' ? width : Math.max(height * 14, 80);
  const canvasHeight = direction === 'horizontal' ? Math.max(height * 14, 80) : width;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), canvas.width, canvas.height);
    gl.uniform3f(gl.getUniformLocation(program, 'uColor'), colorVec[0], colorVec[1], colorVec[2]);
    gl.uniform1f(gl.getUniformLocation(program, 'uFlowSpeed'), flowSpeed);
    gl.uniform1f(gl.getUniformLocation(program, 'uFlowStrength'), flowStrength);
    gl.uniform1f(gl.getUniformLocation(program, 'uWispDensity'), wispDensity);
    gl.uniform1f(gl.getUniformLocation(program, 'uFogIntensity'), fogIntensity);
    gl.uniform1f(gl.getUniformLocation(program, 'uWispIntensity'), wispIntensity);
    gl.uniform1f(gl.getUniformLocation(program, 'uDecay'), decay);
    gl.uniform1f(gl.getUniformLocation(program, 'uVerticalOffset'), verticalBeamOffset);
    gl.uniform1f(gl.getUniformLocation(program, 'uHorizontalOffset'), horizontalBeamOffset);
    gl.uniform1f(gl.getUniformLocation(program, 'uDirection'), direction === 'vertical' ? 1.0 : 0.0);
    gl.uniform1f(gl.getUniformLocation(program, 'uSharpEnds'), sharpEnds ? 1.0 : 0.0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [colorVec, flowSpeed, flowStrength, wispDensity, fogIntensity, wispIntensity, decay, verticalBeamOffset, horizontalBeamOffset, direction, canvasWidth, canvasHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className={className}
      style={{
        width: direction === 'horizontal' ? `${width}px` : `${Math.max(height * 14, 80)}px`,
        height: direction === 'horizontal' ? `${Math.max(height * 14, 80)}px` : `${width}px`,
      }}
    />
  );
};

export default LaserFlow;
