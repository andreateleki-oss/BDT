import { AnimatePresence, motion } from "framer-motion"
import { X } from "@phosphor-icons/react"

function Lightbox({ open, onClose, image, alt }) {
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
            <img src={image} alt={alt} className="max-w-full max-h-full object-contain shadow-2xl" />
            <button
              onClick={onClose}
              className="absolute top-0 right-0 bg-white rounded-full p-2 transition-colors hover:bg-grey-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label="Fermer"
            >
              <X size={24} className="text-brand-blue" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
