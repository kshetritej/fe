import CategoryCard from "../card/category-card";

export default async function CategorySection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/trip-category`,
  );

  const json = await res.json();
  const data = json.data;
  const categories = data.tripCategories;

  const categoriesExceptDefault = categories.filter(
    (cat) => cat.categoryHandle !== "default",
  );

  return (
    <div className="bg-green-50/50">
      <div className="flex gap-4 md:min-h-[60vh] items-center md:justify-center md:max-w-7xl mx-auto overflow-x-auto py-12 px-4 scroll-smooth">
        {categoriesExceptDefault.map((category: any, index: number) => (
          <CategoryCard
            key={category.id}
            text={category.categoryName}
            image={`${process.env.NEXT_PUBLIC_API_BASE_URL}${category.categoryImage}`}
            link={category.categoryHandle}
          />
        ))}
      </div>
    </div>
  );
}
