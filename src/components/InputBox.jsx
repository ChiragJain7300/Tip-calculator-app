// import React from "react";

// const InputBox = ({ amt, setAmt = () => {}, error, label = "NA", icon }) => {
//   return (
//     <div className="w-full min-w-[350px] flex flex-col gap-2">
//       <div className="flex justify-between items-center">
//         <label
//           htmlFor={label}
//           className="text-Very-dark-cyan font-bold capitalize"
//         >
//           {label}
//         </label>
//         <span className="text-red-700 font-bold">{error.msg}</span>
//       </div>

//       <div className="flex relative items-center">
//         <img src={icon} alt={icon} className="w-[12px] absolute left-[18px]" />
//         <input
//           type="number"
//           step="any"
//           min="0"
//           id={label}
//           value={amt}
//           placeholder="0"
//           className={`w-full px-[18px] py-2 text-right appearance-none bg-Very-light-grayish-cyan text-lg text-Very-dark-cyan font-bold focus:outline-none focus:border-2 border-2 border-transparent rounded-md ${
//             error?.err ? "focus:border-red-700" : "focus:border-Strong-cyan"
//           }`}
//           onChange={(e) => setAmt(Number(e.target.value))}
//         />
//       </div>
//     </div>
//   );
// };

// export default InputBox;

// chat gpt code
import React from "react";

const InputBox = ({
  amt,
  setAmt = () => {},
  error = {},
  label = "NA",
  icon,
}) => {
  return (
    <div className="w-full min-w-[320px] flex flex-col gap-2 ">
      {/* Label and Error */}
      <div className="flex justify-between items-center">
        <label
          htmlFor={label}
          className="text-Very-dark-cyan font-bold capitalize"
        >
          {label}
        </label>
        <span id={`${label}-error`} className="text-red-700 font-bold">
          {error?.err ? error?.msg : ""}
        </span>
      </div>

      {/* Input Field */}
      <div className="flex relative items-center">
        <img
          src={icon}
          alt={`${label} icon`}
          className="w-[12px] absolute left-[18px]"
        />
        <input
          type="number"
          step="any"
          min="0"
          id={label}
          aria-invalid={error?.err || false}
          aria-describedby={`${label}-error`}
          value={amt || ""}
          placeholder="0"
          className={`w-full px-[18px] py-2 text-right appearance-none bg-Very-light-grayish-cyan text-lg text-Very-dark-cyan font-bold focus:outline-none focus:border-2 border-2 border-transparent rounded-md ${
            error?.err ? "focus:border-red-700" : "focus:border-Strong-cyan"
          }`}
          onChange={(e) => setAmt(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default InputBox;
