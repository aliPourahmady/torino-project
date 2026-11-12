import HomePage from "@/home/HomePage";
import { getToursServer } from "@/services/toursSSR";

export const metadata = {
  title: "تورینو",
};
export default async function Home({ searchParams }) {
  const filters = await searchParams;
  const tours = await getToursServer(filters);
  return (
    <div>
      <HomePage tours={tours} filters={filters} />
    </div>
  );
}
