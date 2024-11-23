// // my code
// import { useState } from "react";
// import InputBox from "./components/InputBox";

// function App() {
//   const [billAmt, setBillAmt] = useState("");
//   const [tip, setTip] = useState("");
//   const [people, setPeople] = useState("");
//   const [custTip, setCustTip] = useState(false);

//   const [error, setError] = useState({
//     err: false,
//     msg: "",
//   });
//   const calcTip = () => {
//     // check validation
//     if (billAmt > 0 && people > 0 && tip > 0 && tip < 100) {
//       const tipAmt = (Number(billAmt) * Number(tip)) / 100 / Number(people);
//       const billPerPerson = Number(billAmt) / Number(people) + tipAmt;
//       return { bill: billPerPerson.toFixed(2), tip: tipAmt.toFixed(2) };
//     } else {
//       return 0.0;
//     }
//   };

//   const setTipPercent = (tip) => {
//     setTip(tip);
//   };
//   const custTipFunc = () => {
//     setTip("");
//     setCustTip((prev) => !prev);
//   };
//   const rightList = [
//     {
//       p1: "Tip Amount",
//       p2: "/ person",
//       price: calcTip()?.tip || 0,
//     },
//     {
//       p1: "Total",
//       p2: "/ person",
//       price: calcTip()?.bill || 0,
//     },
//   ];
//   return (
//     <>
//       <main className="w-full min-h-screen bg-Light-grayish-cyan flex flex-col items-center font-primary justify-evenly">
//         <div>
//           <img src="/images/logo.svg" alt="logo.svg" />
//         </div>
//         {/* tip calc cont */}
//         <div className="md:w-7/12 bg-white rounded-lg flex md:flex-row p-6 md:min-w-[750px] gap-3">
//           <div className="md:w-1/2 p-3 pe-6">
//             <form className="flex flex-col gap-8">
//               <InputBox
//                 amt={billAmt}
//                 setAmt={setBillAmt}
//                 label="Bill"
//                 icon={"/images/icon-dollar.svg"}
//                 error={error}
//               />
//               <div>
//                 <p className="mb-3 text-Very-dark-cyan font-bold">
//                   Select Tip %
//                 </p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {["5", "10", "15", "25", "50"].map((item) => (
//                     <div
//                       className={` py-2 flex items-center justify-center text-white font-bold text-lg rounded-md cursor-pointer hover:bg-Strong-cyan duration-100 ${
//                         tip === item ? "bg-Strong-cyan" : "bg-Very-dark-cyan"
//                       }`}
//                       onClick={(e) => setTipPercent(e.target.id)}
//                       id={item}
//                     >
//                       {item}%
//                     </div>
//                   ))}
//                   {custTip ? (
//                     <div className="w-full flex">
//                       <input
//                         value={tip}
//                         onChange={(e) => setTip(e.target.value)}
//                         type="number"
//                         step={"any"}
//                         min={"0"}
//                         max={"100"}
//                         className="w-full px-3 text-right appearance-none bg-Very-light-grayish-cyan text-lg text-Very-dark-cyan font-bold focus:outline-none focus:border-2 border-2 border-transparent rounded-md"
//                         autoFocus
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className="bg-Very-light-grayish-cyan tex py-2 flex items-center justify-center text-Dark-grayish-cyan font-extrabold text-lg rounded-md cursor-pointer"
//                       onClick={custTipFunc}
//                     >
//                       Custom
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <InputBox
//                 amt={people}
//                 setAmt={setPeople}
//                 label="Number of people"
//                 icon={"/images/icon-person.svg"}
//                 error={error}
//               />
//             </form>
//           </div>
//           {/* right */}
//           <div className="md:w-1/2 flex flex-col bg-Very-dark-cyan rounded-lg p-10 gap-14">
//             {rightList.map((item) => (
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-white">{item.p1}</p>
//                   <p className="text-Grayish-cyan text-xs">{item.p2}</p>
//                 </div>

//                 <div>
//                   <span className="text-4xl font-bold text-Strong-cyan">
//                     ${item?.price}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             <button className="w-full bg-Strong-cyan text-Very-dark-cyan font-extrabold uppercase text-xl py-2 rounded-md tracking-wider mt-auto">
//               reset
//             </button>
//           </div>
//         </div>
//       </main>
//       <footer>
//         <div className="attribution">
//           Challenge by{" "}
//           <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
//             Frontend Mentor
//           </a>
//           . Coded by <a href="#">Your Name Here</a>.
//         </div>
//       </footer>
//     </>
//   );
// }

// export default App;

// chat gpt code
import { useState, useMemo } from "react";
import InputBox from "./components/InputBox";

function App() {
  const [billAmt, setBillAmt] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");
  const [custTip, setCustTip] = useState(false);

  const [error, setError] = useState({
    bill: { err: false, msg: "" },
    tip: { err: false, msg: "" },
    people: { err: false, msg: "" },
  });

  // Tip Calculation with Validation
  const calcTip = () => {
    let hasError = false;

    // Validate Bill Amount
    if (billAmt <= 0) {
      setError((prev) => ({
        ...prev,
        bill: { err: true, msg: "Bill must be greater than 0" },
      }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, bill: { err: false, msg: "" } }));
    }

    // Validate Tip Percentage
    if (tip <= 0 || tip > 100) {
      setError((prev) => ({
        ...prev,
        tip: { err: true, msg: "Tip must be between 1 and 100" },
      }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, tip: { err: false, msg: "" } }));
    }

    // Validate Number of People
    if (people <= 0) {
      setError((prev) => ({
        ...prev,
        people: { err: true, msg: "Can't be 0" },
      }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, people: { err: false, msg: "" } }));
    }

    if (hasError) return null;

    // Calculate Tip and Total Per Person
    const tipAmt = (Number(billAmt) * Number(tip)) / 100 / Number(people);
    const billPerPerson = Number(billAmt) / Number(people) + tipAmt;

    return { bill: billPerPerson.toFixed(2), tip: tipAmt.toFixed(2) };
  };

  // Memoized Tip Calculation
  const tipData = useMemo(() => calcTip(), [billAmt, tip, people]);

  // Toggle Custom Tip
  const custTipFunc = () => {
    setTip("");
    setCustTip((prev) => !prev);
  };

  // Reset All States
  const resetCalculator = () => {
    setBillAmt("");
    setTip("");
    setPeople("");
    setCustTip(false);
    setError({
      bill: { err: false, msg: "" },
      tip: { err: false, msg: "" },
      people: { err: false, msg: "" },
    });
  };
  console.log(tip);

  return (
    <main className="w-full min-h-screen bg-Light-grayish-cyan flex flex-col items-center font-primary justify-evenly py-8">
      <div>
        <img src="/images/logo.svg" alt="logo.svg" />
      </div>

      {/* Tip Calculator Container */}
      <div className="max-w-[850px] md:min-w-[750px] md:w-10/12 bg-white rounded-lg flex md:flex-row p-6 gap-3 flex-col my-8">
        {/* Left Section - Inputs */}
        <div className="md:w-1/2 p-3 pe-6">
          <form className="flex flex-col gap-8">
            {/* Bill Amount Input */}
            <InputBox
              amt={billAmt}
              setAmt={setBillAmt}
              label="Bill"
              icon="/images/icon-dollar.svg"
              error={error.bill}
            />

            {/* Tip Selection */}
            <div>
              <p className="mb-3 text-Very-dark-cyan font-bold">Select Tip %</p>
              <div className="grid grid-cols-3 gap-3">
                {["5", "10", "15", "25", "50"].map((item) => (
                  <div
                    key={item}
                    className={`py-2 flex items-center justify-center text-white font-bold text-lg rounded-md cursor-pointer hover:bg-Strong-cyan duration-100 ${
                      tip == item ? "bg-Strong-cyan" : "bg-Very-dark-cyan"
                    }`}
                    onClick={() => setTip(Number(item))}
                  >
                    {item}%
                  </div>
                ))}
                {custTip ? (
                  <input
                    value={tip}
                    onChange={(e) => setTip(Number(e.target.value))}
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 text-right appearance-none bg-Very-light-grayish-cyan text-lg text-Very-dark-cyan font-bold focus:outline-none focus:border-2 border-2 border-transparent rounded-md"
                    autoFocus
                  />
                ) : (
                  <div
                    className="bg-Very-light-grayish-cyan py-2 flex items-center justify-center text-Dark-grayish-cyan font-extrabold text-lg rounded-md cursor-pointer"
                    onClick={custTipFunc}
                  >
                    Custom
                  </div>
                )}
              </div>
            </div>

            {/* Number of People Input */}
            <InputBox
              amt={people}
              setAmt={setPeople}
              label="Number of people"
              icon="/images/icon-person.svg"
              error={error.people}
            />
          </form>
        </div>

        {/* Right Section - Results */}
        <div className="md:w-1/2 flex flex-col bg-Very-dark-cyan rounded-lg p-10 gap-14">
          {tipData ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Tip Amount</p>
                  <p className="text-Grayish-cyan text-xs">/ person</p>
                </div>
                <span className="text-4xl font-bold text-Strong-cyan">
                  ${tipData.tip}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Total</p>
                  <p className="text-Grayish-cyan text-xs">/ person</p>
                </div>
                <span className="text-4xl font-bold text-Strong-cyan">
                  ${tipData.bill}
                </span>
              </div>
            </>
          ) : (
            <p className="text-red-600 text-center font-extrabold text-4xl w-full leading-[1.4]">
              Please <br /> enter <br /> valid <br /> inputs!!!
            </p>
          )}

          <button
            onClick={resetCalculator}
            className="w-full bg-cyan-800 shadow-xl hover:bg-Strong-cyan text-Very-dark-cyan font-extrabold uppercase text-xl py-2 rounded-md tracking-wider mt-auto duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
