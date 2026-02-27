import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LogoWhiteNoBGwithDesigns({ 
  className = "", 
  width = 1200, 
  height = 400,
  priority = false 
}: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-full">
        <Image
          src="/logo-white-Nobg.svg"
          alt="Fehmi Farzana Designs"
          width={width}
          height={height}
          className="w-full h-auto object-contain"
          priority={priority}
        />
        <div className="flex justify-center w-full mt-1 px-12">
          {['D', 'E', 'S', 'I', 'G', 'N', 'S'].map((letter, index) => (
            <span 
              key={index} 
              className="text-white font-light text-[10px] sm:text-xs md:text-sm uppercase leading-none ml-1"
              style={{ textShadow: "1px 1px 0 #999, 2px 2px 3px rgba(253, 250, 250, 0.6)" }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
