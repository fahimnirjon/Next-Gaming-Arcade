import { getGameCategories } from "@/lib/gameQueries"

export default async function Page() {
  const categories = await getGameCategories();

  return(
    <div>
      <h1 className="font-display text-3xl mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6">
      {categories.map((game) => (
        <a href={`/category/${game.slug}`} key={game.id} className="group">
          <div className="overflow-hidden rounded-lg border-accent-secondary border">
            <img
              src={`./category/${game.image}`}
              width={300}
              height={300}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
          </div>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
        </a>
      ))}

      </div>
    </div>
  )
}