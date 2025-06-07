import type React from "react"
import { useState, useEffect, useRef } from "react"

interface HoverEffectProps {
  children: React.ReactNode
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          className="absolute bg-primary/20 rounded-full w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out blur-xl z-[9999999]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}
    </div>
  )
}

