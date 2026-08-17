"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  imageUrl: string
  linkUrl: string | null
}

export function Slideshow({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (slides.length <= 1) return
    
    // Auto advance every 5 seconds
    timerRef.current = setInterval(nextSlide, 5000)
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slides.length, currentIndex])

  if (!slides || slides.length === 0) return null

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden bg-muted">
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full flex-shrink-0">
            {slide.linkUrl ? (
              <a href={slide.linkUrl} className="block w-full h-full">
                <img src={slide.imageUrl} alt="Banner" className="w-full h-full object-cover" />
              </a>
            ) : (
              <img src={slide.imageUrl} alt="Banner" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
      
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
