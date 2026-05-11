import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как выбрать подходящую дверь?",
    answer:
      "Наши консультанты помогут вам определиться с выбором бесплатно. Просто опишите стиль вашего интерьера, размеры проёма и бюджет — и мы подберём несколько подходящих вариантов для сравнения.",
  },
  {
    question: "Сколько времени занимает установка?",
    answer:
      "Установка одной двери занимает в среднем 1–3 часа. Мы согласуем удобное для вас время визита мастера и приедем точно по расписанию. После установки проводим уборку и проверку работы фурнитуры.",
  },
  {
    question: "Есть ли гарантия на двери и установку?",
    answer:
      "Да! На все двери действует заводская гарантия производителя (от 1 до 5 лет в зависимости от модели). На работы по установке мы даём собственную гарантию 2 года.",
  },
  {
    question: "Можно ли заказать дверь нестандартного размера?",
    answer:
      "Конечно. Мы работаем с производителями, которые выполняют двери под нестандартные проёмы. Обмер и консультацию по нестандартным размерам проводим бесплатно.",
  },
  {
    question: "Вы доставляете двери на дом?",
    answer:
      "Да, доставляем по всему городу. При заказе установки доставка входит в стоимость. При самовывозе из шоурума предоставляем помощь в погрузке.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Оставьте заявку через форму на сайте или позвоните нам. Менеджер свяжется с вами в течение 30 минут, уточнит детали и оформит заказ. Работаем без предоплаты на ряд позиций.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}