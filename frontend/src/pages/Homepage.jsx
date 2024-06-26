import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
function Homepage() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option

  const predefinedNames = [
    { name: "NIT Kurushetra", link: "/register/NITK" },
    { name: "NIT Meghalaya", link: "/register/NITM" }
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredSuggestions = predefinedNames.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setSelectedOption(null); // Reset selected option when input value changes
  };

  const handleSuggestionClick = (option) => {
    setInputValue(option.name);
    setSuggestions([]);
    setSelectedOption(option);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header val={0} />
      <div className="flex flex-row justify-between items-center mx-12 ">
        <div className="w-[30%] ">
          <h1 className="text-[2.5rem] leading-10 tracking-wide font-semibold mb-4">Connecting Students and Colleges for Placement Success</h1>
          <p className="text-xl  text-[#666666] mb-6">Register and discover endless opportunities to streamline the placement process and pave the way for success.</p>
          <div className="flex flex-col justify-start items-start mt-2">
            <form className="flex flex-row gap-10 justify-center items-center">
              <div className="input-field">
              {/* <label htmlFor="search" className="label">Search</label> */}
              <input
                ref={inputRef}
                id="search"
                type="search"
                pattern=".*\S.*"
                required
                value={inputValue}
                onChange={handleChange}
                className=""
              />
              <span className="caret"></span>
              </div>
              
              <button
                onClick={() => {
                  if (selectedOption) {
                    navigate(selectedOption.link);
                  }
                }}
                className={`p-2 border border-black bg-[#d0d0d0] rounded-xl ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!selectedOption}
              >
                <FaArrowRight />
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className=" relative z-10 bg-[#EBEBEB] w-[20em]  border-x border-t border-[#d0d0d0] rounded-xl">
                {suggestions.map((option, index) => (
                  <li key={index}
                    onClick={() => handleSuggestionClick(option)}
                    className="border-b border-[#d0d0d0] h-12 flex flex-row items-center hover:cursor-pointer px-2 hover:scale-105 rounded-xl  hover:bg-[#dad6d6] text-[#737373]"
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-[55%]">
          <img src="home.png" alt="home" />
        </div>
      </div>
    </>
  );
}

export default Homepage;
