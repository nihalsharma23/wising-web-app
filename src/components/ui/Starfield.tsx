import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  blinkSpeed: number;
  phase: number;
}

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Create movement from left-bottom to right-top
  const translateX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      // Make canvas slightly larger to handle movement without edges
      canvas.width = window.innerWidth * 1.2;
      canvas.height = window.innerHeight * 1.2;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 7000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.9 + 0.1,
          baseOpacity: Math.random() * 0.6 + 0.2,
          blinkSpeed: Math.random() * 0.01 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.phase += star.blinkSpeed;
        const opacity = star.baseOpacity + Math.sin(star.phase) * 0.3;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, opacity)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ x: translateX, y: translateY, scale: 1.1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  );
};

export default Starfield;

