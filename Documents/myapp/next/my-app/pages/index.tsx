import { gql, useQuery } from "@apollo/client";
import { DarkMode } from "use-dark-mode";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import LoadingPage from "../components/LoadingPage";

import QUERY from "../schema/getApplicationForm";

const Home = (props: { darkmode: DarkMode }) => {
  const { darkmode } = props;
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return <LoadingPage />;
  if (error) return <p>ERRR! {error.message}</p>;

  return (
    <main>
      <div className="flex justify-end">
        <div
          className="bg-contain	rounded-none p-2 m-2"
          onClick={darkmode.toggle}
        >
          {darkmode.value ? (
            <BsFillSunFill size={30} className="text-[#f59e0b]" />
          ) : (
            <BsFillMoonFill size={30} className="text-[#f59e0b]" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
