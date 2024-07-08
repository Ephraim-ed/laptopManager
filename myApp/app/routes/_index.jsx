import { Link } from "@remix-run/react";
import { fetchLaptop, deleteLaptop, updateLaptop } from "../components/API";
import { useEffect, useState } from "react";
import LaptopInfo from "./makeForm";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function button() {
  return (
    <Link to="/makeform">
      <button className="btn gap-1">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        Create New
      </button>
    </Link>
  );
}

export default function Index() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const getLaptops = async () => {
      const laptopData = await fetchLaptop();
      setLaptops(laptopData);
    };
    getLaptops();
  }, []);

  // const handleUpdatedLaptop = async(id) => {
  //   const updatedLaptop = {
  //     currentUser: <form><input type="text" /><input type='submit' /></form>
  //   };
  //   const laptop = await updateLaptop(id, updatedLap);
  //   setLaptops(laptops.map((i) => (i.id === id ? laptop : i)));
  // };

  const handleDeleteLaptop = async (id) => {
    await deleteLaptop(id);
    setLaptops(laptops.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className="main">
        <div className="mainGrid">
          <div className="sidebar py-4 shadow">
            <div className="w-40 font-mono">
              <h1 className="heading text-wrap text-4xl font-semibold text-white 2xl:text-5xl">
                Laptop Inventory Manager
              </h1>
            </div>
            {button()}
          </div>

          {/* items  */}
          <div className="Grid overflow-y-auto mr-0">
            {laptops.map((laptop) => {
              return (
                <div className="item" key={laptop.id}>
                  <div className="content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                      />
                    </svg>
                  </div>
                  <div className="content">
                    <h1 className="serial-number">
                      Serial Number: <span>{laptop.serialNumber}</span>
                    </h1>
                    <h1>
                      Model: <span>{laptop.model}</span>
                    </h1>
                    <h1>
                      Current User: <span>{laptop.currentUser}</span>
                    </h1>
                  </div>

                  <div className="flex flex-col justify-center">
                    <button
                      className="justify-center content-center"
                      onClick={() => handleDeleteLaptop(laptop.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link to="/updateForm">
                    <button
                      className="text-gray-300 hover:text-gray-500"
                      onClick={() => LaptopInfo(laptop.id)}
                    >
                      Edit
                    </button>
                    </Link>
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
