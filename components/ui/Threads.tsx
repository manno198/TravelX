"use client"

import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl'

interface ThreadsProps {
  color?: [number, number, number]
  amplitude?: number
  distance?: number
  enableMouseInteraction?: boolean
  className?: string
}

export default function Threads({
  color = [0, 0, 0], // Black color for lines
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  className = ""
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const glRef = useRef<any>(null)
  const programRef = useRef<Program | null>(null)
  const meshRef = useRef<Mesh | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const currentMouseRef = useRef<[number, number]>([0.5, 0.5])
  const targetMouseRef = useRef<[number, number]>([0.5, 0.5])

  const vertexShader = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `

  const fragmentShader = `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec3 uColor;
    uniform float uAmplitude;
    uniform float uDistance;
    uniform vec2 uMouse;

    #define PI 3.1415926538

    const int u_line_count = 40;
    const float u_line_width = 7.0;
    const float u_line_blur = 10.0;

    float Perlin2D(vec2 P) {
        vec2 Pi = floor(P);
        vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
        vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
        Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
        Pt += vec2(26.0, 161.0).xyxy;
        Pt *= Pt;
        Pt = Pt.xzxz * Pt.yyww;
        vec4 hash_x = fract(Pt * (1.0 / 951.135664));
        vec4 hash_y = fract(Pt * (1.0 / 642.949883));
        vec4 grad_x = hash_x - 0.49999;
        vec4 grad_y = hash_y - 0.49999;
        vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
            * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
        grad_results *= 1.4142135623730950;
        vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
                   * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
        vec4 blend2 = vec4(blend, vec2(1.0 - blend));
        return dot(grad_results, blend2.zxzx * blend2.wwyy);
    }

    float pixel(float count, vec2 resolution) {
        return (1.0 / max(resolution.x, resolution.y)) * count;
    }

    float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
        float split_offset = (perc * 0.4);
        float split_point = 0.1 + split_offset;

        float amplitude_normal = smoothstep(split_point, 0.7, st.x);
        float amplitude_strength = 0.5;
        float finalAmplitude = amplitude_normal * amplitude_strength
                               * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

        float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
        float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

        float xnoise = mix(
            Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
            Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
            st.x * 0.3
        );

        float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

        float line_start = smoothstep(
            y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
            y,
            st.y
        );

        float line_end = smoothstep(
            y,
            y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
            st.y
        );

        return clamp(
            (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
            0.0,
            1.0
        );
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;

        float line_strength = 1.0;
        for (int i = 0; i < u_line_count; i++) {
            float p = float(i) / float(u_line_count);
            line_strength *= (1.0 - lineFn(
                uv,
                u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
                p,
                (PI * 1.0) * p,
                uMouse,
                iTime,
                uAmplitude,
                uDistance
            ));
        }

        float colorVal = 1.0 - line_strength;
        fragColor = vec4(uColor * colorVal, colorVal);
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `

  const resize = () => {
    if (!containerRef.current || !rendererRef.current || !programRef.current) return

    const container = containerRef.current
    const { clientWidth, clientHeight } = container
    rendererRef.current.setSize(clientWidth, clientHeight)
    programRef.current.uniforms.iResolution.value.r = clientWidth
    programRef.current.uniforms.iResolution.value.g = clientHeight
    programRef.current.uniforms.iResolution.value.b = clientWidth / clientHeight
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = 1.0 - (e.clientY - rect.top) / rect.height
    targetMouseRef.current = [x, y]
  }

  const handleMouseLeave = () => {
    targetMouseRef.current = [0.5, 0.5]
  }

  const update = (t: number) => {
    if (!programRef.current || !rendererRef.current || !meshRef.current) return

    if (enableMouseInteraction) {
      const smoothing = 0.05
      currentMouseRef.current[0] += smoothing * (targetMouseRef.current[0] - currentMouseRef.current[0])
      currentMouseRef.current[1] += smoothing * (targetMouseRef.current[1] - currentMouseRef.current[1])
      programRef.current.uniforms.uMouse.value[0] = currentMouseRef.current[0]
      programRef.current.uniforms.uMouse.value[1] = currentMouseRef.current[1]
    } else {
      programRef.current.uniforms.uMouse.value[0] = 0.5
      programRef.current.uniforms.uMouse.value[1] = 0.5
    }

    programRef.current.uniforms.iTime.value = t * 0.001
    rendererRef.current.render({ scene: meshRef.current })
    animationIdRef.current = requestAnimationFrame(update)
  }

  const initializeScene = () => {
    if (!containerRef.current) return

    cleanup()

    const container = containerRef.current
    rendererRef.current = new Renderer({ alpha: true })
    glRef.current = rendererRef.current.gl
    glRef.current.clearColor(0, 0, 0, 0)
    glRef.current.enable(glRef.current.BLEND)
    glRef.current.blendFunc(glRef.current.SRC_ALPHA, glRef.current.ONE_MINUS_SRC_ALPHA)

    const geometry = new Triangle(glRef.current)
    programRef.current = new Program(glRef.current, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(glRef.current.canvas.width, glRef.current.canvas.height, glRef.current.canvas.width / glRef.current.canvas.height)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    })

    meshRef.current = new Mesh(glRef.current, { geometry, program: programRef.current })

    const canvas = glRef.current.canvas as HTMLCanvasElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.zIndex = '1'

    container.appendChild(canvas)

    window.addEventListener('resize', resize)
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    resize()
    animationIdRef.current = requestAnimationFrame(update)
  }

  const cleanup = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }

    window.removeEventListener('resize', resize)

    if (containerRef.current) {
      containerRef.current.removeEventListener('mousemove', handleMouseMove)
      containerRef.current.removeEventListener('mouseleave', handleMouseLeave)

      const canvas = containerRef.current.querySelector('canvas')
      if (canvas) {
        containerRef.current.removeChild(canvas)
      }
    }

    if (glRef.current) {
      glRef.current.getExtension('WEBGL_lose_context')?.loseContext()
    }

    rendererRef.current = null
    glRef.current = null
    programRef.current = null
    meshRef.current = null
    currentMouseRef.current = [0.5, 0.5]
    targetMouseRef.current = [0.5, 0.5]
  }

  useEffect(() => {
    initializeScene()

    return () => {
      cleanup()
    }
  }, [color, amplitude, distance, enableMouseInteraction])

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative ${className}`}
      style={{ zIndex: 1 }}
    />
  )
} 