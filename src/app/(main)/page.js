import HeroSlider from "@/components/Sliders/HeroSlider";
import CategorySlider from "@/components/Sliders/CategorySlider";
import GameCategory from "@/components/GameCategory";
import { getGameCategories, getGamesByCategoryId, getGamesBySelectedCategories } from "@/lib/gameQueries";

export default async function Home() {
  // const allCategoreis = await getGameCategories();
  // const category = await getGamesByCategoryId(1);

  const [allCategoreis, category] = await Promise.all([
    getGameCategories(),
    getGamesByCategoryId(1)
  ]);

  const selectedCategoryIds = [1,2,5];
  const multipleCategories = await getGamesBySelectedCategories(selectedCategoryIds);

  return (
    <>
      <HeroSlider />
      <CategorySlider categories={allCategoreis} />
      <GameCategory category={category} />

      {/* <GameCategory category={multipleCategories[1]} /> */}
      {/* <pre>{JSON.stringify(multipleCategories, null, 2)}</pre> */}

    </>
  );
}
