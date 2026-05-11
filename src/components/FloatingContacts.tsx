import { useState } from "react"
import Icon from "@/components/ui/icon"

const buttons = [
  {
    label: "Позвонить",
    href: "tel:+78001234567",
    icon: "Phone",
    bg: "bg-foreground hover:bg-foreground/80",
    text: "text-white",
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/tvoya_dver",
    icon: null,
    bg: "bg-[#0077FF] hover:bg-[#0066DD]",
    text: "text-white",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.593.712z"/>
      </svg>
    ),
  },
  {
    label: "MAX",
    href: "https://max.ru/tvoya_dver",
    icon: null,
    bg: "bg-[#2688EB] hover:bg-[#1a70cc]",
    text: "text-white",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.928l-2.95-.924c-.641-.203-.657-.641.136-.953l11.57-4.461c.535-.194 1.003.131.878.631z"/>
      </svg>
    ),
  },
]

export function FloatingContacts() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-200 ${btn.bg} ${btn.text}`}
            >
              <span className="text-sm font-medium whitespace-nowrap">{btn.label}</span>
              {btn.icon ? (
                <Icon name={btn.icon as "Phone"} size={18} />
              ) : (
                btn.svg
              )}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          expanded
            ? "bg-foreground text-white rotate-45"
            : "bg-orange-500 hover:bg-orange-400 text-white"
        }`}
        aria-label="Связаться с нами"
      >
        <Icon name={expanded ? "X" : "MessageCircle"} size={22} />
      </button>
    </div>
  )
}
