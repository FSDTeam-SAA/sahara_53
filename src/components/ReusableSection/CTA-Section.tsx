export function CTA() {
  return (
    <div
      className="relative p-[2px] rounded-lg bg-gradient-to-r from-[#FF7CE5] to-[#5D5FEF]"
      style={{
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      }}
    >
      <div
        className="bg-white flex flex-col items-center justify-center"
        style={{
          width: "full",
          height: "264px",
          borderRadius: "6px",
          padding: "40px 60px",
        }}
      >
        <h1
          className="font-bold text-center"
          style={{
            fontSize: "22px",
            lineHeight: "28px",
            color: "#1a1a1a",
            marginBottom: "8px",
          }}
        >
          Repurpose any content with AI
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "#6b7280",
            maxWidth: "520px",
            marginBottom: "32px",
          }}
        >
          Start with a link or plain text to instantly transform into new content formats.
        </p>

        <div className="flex items-center" style={{ gap: "24px" }}>
          {/* Generate Content button: 237x48px, 6px radius */}
          <button
            className="flex items-center justify-center bg-gradient-to-r from-[#FF7CE5] to-[#5D5FEF] text-white font-medium"
            style={{
              width: "237px",
              height: "48px",
              borderRadius: "6px",
              fontSize: "16px",
              gap: "8px",
            }}
          >
            <SparkleIcon />
            Generate Content
          </button>

          {/* How it works button: 201x46px inner, 2px border, 5px radius */}
          <div className="p-[2px]">
            <button
              className="bg-white font-medium border-primary-gradient border-2 rounded-2xl"
              style={{
                width: "197px",
                height: "42px",
                fontSize: "16px",
              }}
            >
              How it works
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main 4-point star */}
      <path
        d="M7.85 13.5C7.76 13.154 7.58 12.838 7.327 12.586C7.074 12.333 6.759 12.153 6.413 12.063L0.278 10.481C0.173 10.452 0.081 10.389 0.015 10.302C-0.05 10.215 -0.086 10.109 -0.086 10C-0.086 9.891 -0.05 9.786 0.015 9.699C0.081 9.612 0.173 9.549 0.278 9.519L6.413 7.936C6.758 7.847 7.074 7.667 7.327 7.414C7.58 7.162 7.76 6.846 7.85 6.5L9.432 0.365C9.461 0.26 9.524 0.168 9.611 0.102C9.698 0.036 9.804 0 9.913 0C10.022 0 10.128 0.036 10.215 0.102C10.302 0.168 10.365 0.26 10.395 0.365L11.976 6.5C12.065 6.846 12.245 7.162 12.498 7.415C12.751 7.668 13.066 7.848 13.413 7.937L19.548 9.518C19.653 9.547 19.746 9.61 19.812 9.697C19.879 9.784 19.915 9.891 19.915 10C19.915 10.11 19.879 10.216 19.812 10.303C19.746 10.39 19.653 10.453 19.548 10.482L13.413 12.063C13.066 12.153 12.751 12.333 12.498 12.586C12.245 12.838 12.065 13.154 11.976 13.5L10.394 19.635C10.364 19.74 10.301 19.833 10.214 19.899C10.127 19.965 10.021 20 9.912 20C9.803 20 9.697 19.965 9.61 19.899C9.523 19.833 9.46 19.74 9.431 19.635L7.85 13.5Z"
        fill="#FFFDF5"
        stroke="#FFFDF5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0, 0)"
      />
      {/* Top-right small cross */}
      <path d="M17.91 1V5" stroke="#FFFDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.91 3H15.91" stroke="#FFFDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom-left small cross */}
      <path d="M1.91 15V17" stroke="#FFFDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.91 16H0.91" stroke="#FFFDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
