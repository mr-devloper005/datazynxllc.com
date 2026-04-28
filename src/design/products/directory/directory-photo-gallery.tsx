"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'

type DirectoryPhotoGalleryProps = {
  images: string[]
  title: string
}

export function DirectoryPhotoGallery({ images, title }: DirectoryPhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  return (
    <>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, 6).map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="relative h-40 overflow-hidden rounded-lg border border-[#c7ccd4] bg-white text-left transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a70]"
            aria-label={`Open ${title} photo ${idx + 1}`}
          >
            <ContentImage src={image} alt={`${title} photo ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow hover:bg-slate-100"
            aria-label="Close photo popup"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] min-h-[320px] w-full bg-slate-100">
              <ContentImage src={images[activeIndex]} alt={`${title} photo ${activeIndex + 1}`} fill className="object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
