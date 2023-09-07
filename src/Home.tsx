import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-[#f1f3f4] min-h-screen flex flex-col gap-4 justify-start items-center  p-10">
      <p className="text-xl font-semibold">Start a new document </p>
      <div className="flex justify-center flex-col gap-2 cursor-pointer" onClick={() => {
          navigate(`/${uuidV4()}`);
        }}>
        <img
          src="/docs-blank-googlecolors.png"
          className=" border rounded"
          width={150}
          height={150}
          alt="notfound"
        />
        <p>Blank</p>
      </div>
    </div>
  );
};

export default Home;
