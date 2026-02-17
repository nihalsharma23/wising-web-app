interface NetworkCanvasProps {
    className?: string; // Allow custom classNames
}

export function NetworkCanvas({ className }: NetworkCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 150; // Dense: Increased to 150
        const connectionDistance = 150; // Closeness: Increased connection range
        const mouseDistance = 180;

        let mouse = { x: 0, y: 0 };
        // ... (rest of the file logic is unchanged, just updating component signature and return)

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-0 pointer-events-none ${className || ''}`} // Changed fixed to absolute, allow override
        />
    );
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;

    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 120, 120, 0.4)'; // Opacity: Increased to 0.4
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

const animate = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();

        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(120, 120, 120, ${0.4 * (1 - distance / connectionDistance)})`; // Web Opacity: 0.4
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(120, 120, 120, ${0.5 * (1 - distance / mouseDistance)})`; // Mouse interaction slightly stronger
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    });

    requestAnimationFrame(animate);
};

animate();

const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};

const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

window.addEventListener('resize', handleResize);
window.addEventListener('mousemove', handleMouseMove);

return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
};
    }, []);

return (
    <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
    />
);
}
