import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const accumulatedScrollRef = useRef(0)
  const touchStartY = useRef<number>(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTopOfPage = window.scrollY === 0

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress >= 1) {
          setAnimationComplete(true)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      } else if (atTopOfPage && animationComplete && e.deltaY < 0) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress < 1) {
          setAnimationComplete(false)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTopOfPage = window.scrollY === 0
      const currentTouchY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentTouchY

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress >= 1) {
          setAnimationComplete(true)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      } else if (atTopOfPage && animationComplete && deltaY < 0) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress < 1) {
          setAnimationComplete(false)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }

      lastTouchY.current = currentTouchY
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [animationComplete])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/93f6f19e-14d8-488c-8224-e6c1ca3029a6.jpg"
          alt="Роскошный интерьер с элегантной дверью"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-6 md:px-12 lg:pt-0 relative z-10 pb-0 pl-1 pr-1 pt-8 md:pt-0"
        style={{
          willChange: "transform",
          transform: "translateY(0px)",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-72 md:mb-60 lg:mb-80">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-secondary mb-4">{"Салон дверей"}</p>

          <h1
            ref={titleRef}
            className="text-balance text-center text-white mb-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span
              className="block"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 0.95 }}
            >
              {"ТвояДверь"}
            </span>
            <span
              className="block"
              style={{ fontSize: "clamp(1.4rem, 3.8vw, 3rem)", fontStyle: "italic", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.4, marginTop: "0.5em", color: "rgb(187 222 195)" }}
            >
              {"Не просто дверь. А твоя история"}
            </span>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <img
          src="/images/hously-foreground.png"
          alt="Мраморная кухонная столешница"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {animationComplete && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </section>
  )
}