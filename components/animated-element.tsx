"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"
import * as animations from "@/lib/framer-animations"

type AnimationType = keyof typeof animations

interface AnimatedElementProps {
  children: ReactNode
  animation: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

export default function AnimatedElement({
  children,
  animation,
  delay = 0,
  duration,
  className = "",
  threshold = 0.1,
  once = true,
}: AnimatedElementProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })

  const selectedAnimation = animations[animation]
  const animationVariants = {
    ...selectedAnimation,
    visible: {
      ...selectedAnimation.visible,
      transition: {
        ...selectedAnimation.visible.transition,
        delay,
        duration: duration || selectedAnimation.visible.transition.duration,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animationVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
