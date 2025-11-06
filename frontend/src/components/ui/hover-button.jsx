import * as React from "react"
import { cn } from "../../lib/utils"

// A hover-reactive button with trailing light circles
export const HoverButton = React.forwardRef(function HoverButton(
  { className, children, variant = "default", onClick, ...props },
  ref,
) {
  const buttonRef = React.useRef(null)
  const [isListening, setIsListening] = React.useState(false)
  const [circles, setCircles] = React.useState([])
  const lastAddedRef = React.useRef(0)

  const createCircle = React.useCallback((x, y) => {
    const buttonWidth = buttonRef.current?.offsetWidth || 0
    const xPos = buttonWidth ? x / buttonWidth : 0
    const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
      xPos * 100
    }%)`

    setCircles((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), x, y, color, fadeState: null },
    ])
  }, [])

  const handlePointerMove = React.useCallback(
    (event) => {
      if (!isListening) return
      const currentTime = Date.now()
      if (currentTime - lastAddedRef.current > 50) {
        lastAddedRef.current = currentTime
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        createCircle(x, y)
      }
    },
    [isListening, createCircle],
  )

  const handlePointerEnter = React.useCallback(() => {
    setIsListening(true)
  }, [])

  const handlePointerLeave = React.useCallback(() => {
    setIsListening(false)
  }, [])

  React.useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        const timers = [
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "in" } : c)),
            )
          }, 0),
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "out" } : c)),
            )
          }, 1000),
          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          }, 2200),
        ]
        
        return () => timers.forEach(t => clearTimeout(t))
      }
    })
  }, [circles])

  const baseClasses = cn(
    "relative isolate px-8 py-2.5 rounded-full",
    "font-semibold text-sm leading-5 text-white",
    "cursor-pointer overflow-hidden transition-all duration-300",
    "hover:shadow-lg active:scale-95",
    "w-auto",
    "inline-flex",
  )

  const variantClasses = {
    default: cn(
      "bg-gradient-to-r from-orange-500 via-orange-500 to-amber-400",
      "hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]",
      "border-0",
    ),
    outline: cn(
      "bg-transparent border-2 border-white/30",
      "hover:border-white/60 hover:bg-white/5",
      "backdrop-blur-sm",
    ),
  }

  return (
    <button
      ref={(node) => {
        buttonRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      className={cn(baseClasses, variantClasses[variant], className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={(e) => {
        // Ensure click works on entire button area
        e.stopPropagation()
        // Call the passed onClick handler if it exists
        if (onClick) {
          onClick(e)
        }
      }}
      {...props}
      style={{
        "--circle-start": variant === "default" ? "#ff6b35" : "#ffffff",
        "--circle-end": variant === "default" ? "#ffd700" : "#a0d9f8",
        ...props.style,
      }}
    >
      {circles.map(({ id, x, y, color, fadeState }) => (
        <div
          key={id}
          className={cn(
            "absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "blur-md pointer-events-none z-0 transition-opacity duration-300",
            fadeState === "in" && "opacity-60",
            fadeState === "out" && "opacity-0 duration-[1.2s]",
            !fadeState && "opacity-0",
          )}
          style={{ left: x, top: y, background: color }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">{children}</span>
    </button>
  )
})

HoverButton.displayName = "HoverButton"


