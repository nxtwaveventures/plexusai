import { motion } from 'framer-motion';

import { useEffect, useRef } from 'react';

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  #define OCTAVES 6
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < OCTAVES; ++i) {
          value += amplitude * noise(st);
          st = rot * st * 2.0 + shift;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      vec2 center = vec2(0.5 * u_resolution.x / u_resolution.y, 0.5);
      float d = length(st - center);

      vec2 q = vec2(0.0);
      q.x = fbm(st + 0.00 * u_time);
      q.y = fbm(st + vec2(1.0));

      vec2 r = vec2(0.0);
      float t = u_time * 0.1; // Slow ink spread
      r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
      r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

      float f = fbm(st + r);

      // Colors matching the acrylic pour
      vec3 color = mix(
          vec3(0.01, 0.02, 0.04), // Deep black void
          vec3(0.0, 0.35, 0.7), // Deep azure blue
          clamp((f*f)*4.0, 0.0, 1.0)
      );

      color = mix(
          color,
          vec3(0.0, 0.7, 0.9), // Bright cyan ripples
          clamp(length(q), 0.0, 1.0)
      );

      color = mix(
          color,
          vec3(0.8, 0.9, 1.0), // White/silver cellular edges
          clamp(length(r.x), 0.0, 1.0)
      );

      // Strong central void mask from the image reference
      float voidMask = smoothstep(0.1, 0.6, d); 
      
      float cells = smoothstep(0.3, 0.7, f);
      vec3 finalColor = (color * f * f * 1.5) + (cells * color * 0.6);
      finalColor *= voidMask;

      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FluidCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    let animationId: number;
    let startTime = Date.now();

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

const Hero = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    }}>
      {/* Fluid Paint Mixing Background using WebGL */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 0,
      }}>
        <FluidCanvas />
      </div>

      {/* Very faint dark overlay to ensure text remains perfectly readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(5, 10, 15, 0.7) 30%, rgba(5, 10, 15, 0.2) 100%)',
        zIndex: 1,
      }} />

      {/* Content — left-aligned, bottom anchored like Aperiam Bio */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        paddingBottom: '100px',
        paddingTop: '160px',
        maxWidth: '900px',
        marginLeft: '0',
        marginRight: 'auto',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '32px',
            textAlign: 'left',
          }}
        >
          Validated<br />
          Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '500px',
            lineHeight: 1.5,
            textAlign: 'left',
            marginBottom: '48px',
          }}
        >
          Improving Patient Outcomes<br />
          with Hospital-Grade AI
        </motion.p>



        {/* Minimal Apply Now Button */}
        <motion.a
          href="#sandbox"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 48px',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            color: '#ffffff',
            background: 'transparent',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            textDecoration: 'none',
            marginBottom: '40px',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          Apply Now
        </motion.a>


      </div>

      {/* Stats bar at the bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '60px',
          zIndex: 2,
          display: 'flex',
          gap: '48px',
        }}
      >
        {[
          { value: '3+', label: 'Partner Hospitals' },
          { value: '50+', label: 'AI Startups Validated' },
          { value: '100%', label: 'Clinical-Grade Certified' },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '2rem', color: '#ffffff', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px', fontWeight: 500 }}>
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
