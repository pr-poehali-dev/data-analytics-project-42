import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const SEND_LEAD_URL = "https://functions.poehali.dev/1733fd07-bd8d-4031-a493-5f6ffc623e53"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact-form" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Оставить заявку</p>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6 text-balance lg:text-7xl">
              Свяжемся с вами
              <br />
              за <HighlightedText>30 минут</HighlightedText>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Оставьте контакты — наш консультант поможет подобрать дверь, уточнит стоимость и запишет на замер.
            </p>

            <div className="space-y-5">
              <a
                href="tel:+78001234567"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-300">
                  <Icon name="Phone" size={18} className="group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Телефон</p>
                  <p className="font-medium">8 (800) 123-45-67</p>
                </div>
              </a>

              <a
                href="https://vk.com/tvoya_dver"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-[#0077FF] group-hover:border-[#0077FF] transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-white transition-colors duration-300">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.593.712z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">ВКонтакте</p>
                  <p className="font-medium">vk.com/tvoya_dver</p>
                </div>
              </a>

              <a
                href="https://max.ru/tvoya_dver"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-[#2688EB] group-hover:border-[#2688EB] transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-white transition-colors duration-300">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.928l-2.95-.924c-.641-.203-.657-.641.136-.953l11.57-4.461c.535-.194 1.003.131.878.631z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">MAX</p>
                  <p className="font-medium">max.ru/tvoya_dver</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 shadow-sm">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <Icon name="CheckCircle" size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3">Заявка отправлена!</h3>
                <p className="text-muted-foreground">Наш консультант свяжется с вами в течение 30 минут.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 123-45-67"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Что вас интересует?</label>
                  <textarea
                    rows={3}
                    placeholder="Например: межкомнатные двери в стиле лофт, 3 штуки..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">Что-то пошло не так. Пожалуйста, позвоните нам напрямую.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-foreground text-white py-4 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-60"
                >
                  {status === "loading" ? "Отправляем..." : "Оставить заявку"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
