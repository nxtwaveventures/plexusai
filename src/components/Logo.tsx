interface LogoProps {
  /** Mark + wordmark (default) or mark only */
  variant?: 'full' | 'mark';
  /** Height of the mark in px */
  size?: number;
  /** Force light/dark wordmark colour; defaults to --text-dark */
  theme?: 'light' | 'dark';
}

const ACCENT = '#0D9488';

// Pentagon nodes centred at (18, 17.5), radius 13
const cx = 18, cy = 17.5, R = 13;
const angleStep = (2 * Math.PI) / 5;
const nodes = Array.from({ length: 5 }, (_, i) => {
  const a = -Math.PI / 2 + i * angleStep;
  return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
});

export default function Logo({ variant = 'full', size = 30, theme = 'dark' }: LogoProps) {
  const wordmarkColor = theme === 'light' ? '#ffffff' : '#1E293B';

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pentagon outer edges */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % 5];
        return (
          <line
            key={`e${i}`}
            x1={n.x} y1={n.y}
            x2={next.x} y2={next.y}
            stroke={ACCENT} strokeWidth="1.1" strokeOpacity="0.3"
            strokeLinecap="round"
          />
        );
      })}

      {/* Spokes from center to each node */}
      {nodes.map((n, i) => (
        <line
          key={`s${i}`}
          x1={cx} y1={cy}
          x2={n.x} y2={n.y}
          stroke={ACCENT} strokeWidth="1.1" strokeOpacity="0.45"
          strokeLinecap="round"
        />
      ))}

      {/* Two skip-1 diagonals for depth (top → bottom-right, top → bottom-left) */}
      <line
        x1={nodes[0].x} y1={nodes[0].y}
        x2={nodes[2].x} y2={nodes[2].y}
        stroke={ACCENT} strokeWidth="0.9" strokeOpacity="0.18"
        strokeLinecap="round"
      />
      <line
        x1={nodes[0].x} y1={nodes[0].y}
        x2={nodes[3].x} y2={nodes[3].y}
        stroke={ACCENT} strokeWidth="0.9" strokeOpacity="0.18"
        strokeLinecap="round"
      />

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.x} cy={n.y}
          r={i === 0 ? 2.6 : 2.1}
          fill={ACCENT}
          fillOpacity={i === 0 ? 1 : 0.75}
        />
      ))}

      {/* Center node — slightly larger, full opacity */}
      <circle cx={cx} cy={cy} r="3.2" fill={ACCENT} />

      {/* Tiny highlight on center node */}
      <circle cx={cx - 0.8} cy={cy - 0.8} r="1" fill="white" fillOpacity="0.35" />
    </svg>
  );

  if (variant === 'mark') return mark;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {mark}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color: wordmarkColor,
          lineHeight: 1,
        }}
      >
        Plexus<span style={{ color: ACCENT }}>AI</span>
      </span>
    </span>
  );
}
