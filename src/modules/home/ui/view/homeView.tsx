import { CategrorySection } from "../section/categorySection";

interface categoriesProps {
  categoryId?: string;
}

const HomeView = async ({ categoryId }: categoriesProps) => {
  return (
    <div className="max-w-[2400px] mb-10 px-4 pt-2.4 mx-auto flex flex-col gap-y-6">
      <CategrorySection categoryId={categoryId} />
    </div>
  );
};
export default HomeView;
