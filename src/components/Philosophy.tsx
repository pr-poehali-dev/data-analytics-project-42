import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Качество без компромиссов",
    description:
      "Мы работаем только с проверенными производителями. Каждая дверь проходит контроль качества перед тем, как попасть к вам домой.",
  },
  {
    title: "Широкий выбор",
    description:
      "Более 500 моделей дверей: входные, межкомнатные, раздвижные. Разные стили, материалы и цветовые решения для любого интерьера.",
  },
  {
    title: "Профессиональный подбор",
    description:
      "Наши консультанты помогут подобрать дверь, идеально вписывающуюся в ваш интерьер — с учётом размеров, стиля и бюджета.",
  },
  {
    title: "Установка под ключ",
    description: "Профессиональные монтажники установят дверь в срок и с гарантией. Вы получаете готовый результат без лишних хлопот.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш подход</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Двери с
              <br />
              <HighlightedText>характером</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/d534991d-d338-4277-82fd-d55269e91e23.jpg"
                alt="Шоурум дверей ТвояДверь"
                className="opacity-90 relative z-10 w-auto rounded-sm"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Дверь — это первое впечатление о вашем доме. Мы помогаем создать его таким, каким вы хотите его видеть: надёжным, стильным и долговечным.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}