export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main 4-pointed star */}
      <path
        d="M40 8L44 32L68 40L44 48L40 72L36 48L12 40L36 32L40 8Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small sparkles */}
      <path
        d="M60 16L62 22L68 24L62 26L60 32L58 26L52 24L58 22L60 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="66" cy="12" r="2" fill="currentColor" />
      <circle cx="54" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="24" width="56" height="44" rx="6" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="40" cy="46" r="14" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="40" cy="46" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M28 24V18C28 15 30 12 34 12H46C50 12 52 15 52 18V24" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  )
}

export function MagicWandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wand diagonal line */}
      <path d="M16 64L56 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Wand tip */}
      <path d="M56 24L64 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {/* Sparkles around wand */}
      <path
        d="M44 20L46 14L48 20L54 22L48 24L46 30L44 24L38 22L44 20Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="62" cy="28" r="2" fill="currentColor" />
      <circle cx="36" cy="12" r="2" fill="currentColor" />
      <circle cx="68" cy="36" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function MicrophoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="12" width="24" height="36" rx="12" stroke="currentColor" strokeWidth="3" fill="none" />
      <path
        d="M18 44C18 56.15 27.85 66 40 66C52.15 66 62 56.15 62 44"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M40 66V74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function EditPencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper/document */}
      <rect x="16" y="16" width="48" height="48" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
      {/* Pencil diagonal */}
      <path d="M24 56L32 24L56 48L24 56Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <path d="M32 24L56 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bag body */}
      <path
        d="M16 28H64V60C64 62.2091 62.2091 64 60 64H20C17.7909 64 16 62.2091 16 60V28Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Bag handle */}
      <path
        d="M28 28V20C28 13.3726 33.3726 8 40 8C46.6274 8 52 13.3726 52 20V28"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Decorative circles at bottom */}
      <circle cx="32" cy="72" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="48" cy="72" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}
