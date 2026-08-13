import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react"

function Pagination({ page, pageCount, onChange }) {
  const pages = [1, 2, 3]

  return (
    <div className="flex gap-1 items-center">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="h-10 px-4 flex items-center gap-2 rounded-md text-[14px] font-medium text-[#323232] disabled:opacity-50"
      >
        <CaretLeft size={20} />
        Précédent
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-10 px-4 flex items-center justify-center rounded-sm text-[14px] font-medium ${
            p === page ? "bg-brand-blue text-white" : "text-brand-blue"
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
        className="h-10 px-4 flex items-center gap-2 rounded-md text-[14px] font-medium text-brand-blue disabled:opacity-50"
      >
        Suivant
        <CaretRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
