import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react"

function Pagination({ page, pageCount, onChange }) {
  const pages = [1, 2, 3]

  return (
    <div className="flex gap-1 items-center">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="h-10 px-4 flex items-center gap-2 rounded-md text-[14px] font-medium text-[#323232] transition-colors hover:enabled:bg-grey-100 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <CaretLeft size={20} />
        Précédent
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-10 px-4 flex items-center justify-center rounded-sm text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
            p === page ? "bg-brand-blue text-white" : "text-brand-blue hover:bg-grey-100"
          }`}
        >
          {p}
        </button>
      ))}

      <div className="size-10 flex items-center justify-center">
        <DotsThree size={20} className="text-brand-blue" />
      </div>

      <button
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        className="h-10 px-4 flex items-center gap-2 rounded-md text-[14px] font-medium text-brand-blue transition-colors hover:enabled:bg-grey-100 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        Suivant
        <CaretRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
