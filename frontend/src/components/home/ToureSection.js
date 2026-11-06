import { getToursServer } from "@/services/toursSSR";
import Tours from "./Tours";

async function ToureSection({ filters, title }) {
  const tours = await getToursServer(filters);
  return <Tours tours={tours} title={title} />;
}

export default ToureSection;
