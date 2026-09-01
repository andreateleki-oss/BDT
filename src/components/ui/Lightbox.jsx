import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react"

function Lightbox({ open, onClose, image, images, initialIndex = 0, alt }) {
  const list = images ?? (image ? [image] : [])
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose?.()
      if (e.key === "ArrowLeft" && list.length > 1) setIndex((i) => (i - 1 + list.length) % list.length)
      if (e.key === "ArrowRight" && list.length > 1) setIndex((i) => (i + 1) % list.length)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose, list.length])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-8 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <img src={list[index]} alt={alt} className="max-w-full max-h-full object-contain shadow-2xl" />
            {list.length > 1 && (
              <>
                <button
                  onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
                  className="group absolute top-1/2 left-5 -translate-y-1/2 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  aria-label="Photo précédente"
                >
                  <CaretLeft size={20} className="text-brand-blue transition-colors group-hover:text-white" />
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % list.length)}
                  className="group absolute top-1/2 right-5 -translate-y-1/2 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  aria-label="Photo suivante"
                >
                  <CaretRight size={20} className="text-brand-blue transition-colors group-hover:text-white" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="group absolute top-5 right-5 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label="Fermer"
            >
              <X size={20} className="text-brand-blue transition-colors group-hover:text-white" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
