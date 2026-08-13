const VARIANTS = {
  solid: "bg-brand-red text-white hover:bg-brand-red/90",
  outline:
    "bg-white text-brand-blue border border-brand-blue hover:bg-brand-blue/5",
  dark: "bg-brand-blue text-white hover:bg-brand-blue/90",
  link: "text-brand-blue font-accent font-semibold underline underline-offset-2",
}

function Button({
  as: Component = "button",
  variant = "solid",
  icon: Icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) {
  const isLink = variant === "link"
  const base = isLink
    ? "inline-flex items-center gap-2 text-[16px] transition-colors"
    : "inline-flex items-center justify-center gap-2 h-12 px-4 py-2 text-[15px] font-semibold font-body transition-colors"

  return (
    <Component className={`${base} ${VARIANTS[variant]} ${className}`} {...props}>
      {Icon && iconPosition === "left" && <Icon size={20} weight="regular" />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={20} weight="regular" />}
    </Component>
  )
}

export default Button
