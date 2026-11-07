import Banner from "./Banner";
import Tours from "./Tours";
import Phone from "./Phone";
import Why from "./Why";
import Options from "./Options";

function HomePage({ tours, filters }) {
  const isSearch = Object.values(filters).some(Boolean);

  return (
    <>
      <Banner />
      <main>
        <Tours
          key={JSON.stringify(filters)}
          tours={tours}
          title={isSearch ? "نتایج جستجو" : "همه تور ها"}
        />
        <Phone />
        <Why />
        <Options />
      </main>
    </>
  );
}

export default HomePage;
