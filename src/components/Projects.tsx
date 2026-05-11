import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Классика Беленый дуб",
    category: "Межкомнатные двери",
    location: "Серия Premium",
    year: "от 18 900 ₽",
    image: "https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/1ab19815-724a-4afc-b87b-d191f38aa75c.jpg",
  },
  {
    id: 2,
    title: "Стальной страж",
    category: "Входные двери",
    location: "Серия Безопасность",
    year: "от 32 500 ₽",
    image: "https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/3d0ba8b8-db46-4886-88b0-e8eb11d27f8c.jpg",
  },
  {
    id: 3,
    title: "Лофт Графит",
    category: "Межкомнатные двери",
    location: "Серия Modern",
    year: "от 24 700 ₽",
    image: "https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/5b9c864f-87e9-4551-b5c3-3d5375a5e998.jpg",
  },
  {
    id: 4,
    title: "Панорама Стекло",
    category: "Раздвижные двери",
    location: "Серия Glass",
    year: "от 41 000 ₽",
    image: "https://cdn.poehali.dev/projects/91ab94b7-908b-4745-8080-a947d2398bf4/files/de586c27-0461-4d99-baa3-2684cdee34a6.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш каталог</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Популярные модели</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Весь каталог
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location} · <span className="text-foreground font-medium">{project.year}</span>
                  </p>
                </div>
                <a href="#contact" className="text-sm text-[#4d8a67] hover:text-[#3d6e52] transition-colors">Заказать →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}