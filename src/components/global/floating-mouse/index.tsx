'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export const Pointer = ({
  children,
  className,
  name,
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  name: string | React.ReactNode
  onClick?: any,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [isInside, setIsInside] = useState<boolean>(false)

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect())
      }
    }
    updateRect()
    window.addEventListener('resize', updateRect)
    return () => window.removeEventListener('resize', updateRect)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top
      const clampedX = Math.max(0, Math.min(rect.width, relativeX))
      const clampedY = Math.max(0, Math.min(rect.height, relativeY))
      x.set(clampedX)
      y.set(clampedY)
    }
  }

  return (
    <div
      onClick={onClick}
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => {
        setIsInside(true)
        if (ref.current) {
          setRect(ref.current.getBoundingClientRect())
        }
      }}
      onMouseMove={handleMouseMove}
      ref={ref}
      className={cn('relative', className)}
      style={{ cursor: 'none' }}
      {...props}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} name={name} />}
      </AnimatePresence>
      {children}
    </div>
  )
}

export const FollowPointer = ({ x, y, name }: { x: any; y: any; name: string | React.ReactNode }) => {
  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full"
      style={{
        top: 0,
        left: 0,
        x,
        y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {name ? name : <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -rotate-[70deg] transform stroke-sky-600 text-sky-500"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>}
    </motion.div>
  )
}
