const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'logo-white-Nobg.svg');
const destPath = path.join(__dirname, 'components', 'home', 'AnimatedLogo.tsx');

const svgContent = fs.readFileSync(svgPath, 'utf8');
const dMatch = svgContent.match(/d="([^"]+)"/);

if (!dMatch) {
  console.error('Could not find d attribute in SVG');
  process.exit(1);
}

const d = dMatch[1];

const componentContent = `
'use client';

import { motion } from 'framer-motion';

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 345 271"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Farzana Fehmi Logo"
    >
      <motion.path
        d="${d}"
        fill="white"
        stroke="white"
        strokeWidth="1"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: 2.5, ease: "easeInOut" },
          fillOpacity: { duration: 0.8, delay: 2 }
        }}
      />
    </motion.svg>
  );
}
`;

fs.writeFileSync(destPath, componentContent);
console.log('Created AnimatedLogo.tsx');
