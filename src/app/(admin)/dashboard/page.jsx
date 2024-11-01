import Header from "@/components/Admin/Header"
import { getAllGames, getGameCategories } from "@/lib/adminQueries"
import Image from "next/image";

export const revalidate = 0;

export default async function Page() {
  const [games, categories] = await Promise.all([
    getAllGames(),
    getGameCategories()
  ]);

  return (
    <>
      <Header/>

      <div className="container mx-auto mb-8 px-4 min-h-[50rem] pb-8 relative mt-10">

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-2 justify-center text-center border border-accent rounded-md p-4">
            <b className="text-xl">{games.length}</b>
            <p className="text-sm">Total Games</p>
          </div>
          <div className="flex flex-col gap-2 justify-center text-center border border-accent rounded-md p-4">
            <b className="text-xl">{categories.length}</b>
            <p className="text-sm">Total Categories</p>
          </div>
          <div className="flex flex-col gap-2 justify-center text-center border border-accent rounded-md p-4">
            <b className="text-xl">#</b>
            <p className="text-sm">More Stats</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-4 mb-4">
            <h1 className="font-display">Games</h1>
            <a href="/dashboard/game/add" className="text-sm border border-accent py-2 px-3 rounded-xl">
              + Add New Game
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {games.map((game) => (
              <a href={`/dashboard/game/${game.id}`} key={game.id} className="flex gap-4 hover:bg-accent-secondary rounded-md">
                <div className="w-16 h-16 bg-slate-100 overflow-hidden rounded-md">
                  <Image
                    src={`/game/${game.image}`}
                    className="object-cover w-full h-full"
                    alt={game.title}
                    width={128}
                    height={128}
                    quality={90}
                  />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-sm text-accent">ID: {game.id}</span>
                  <h1>{game.title}</h1>
                </div>

              </a>
            ))}
          </div>







        </div>

      </div>
    </>
  )
}