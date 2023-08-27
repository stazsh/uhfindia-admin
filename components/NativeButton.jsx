const styleGreen =
  "bg-green-500 hover:bg-green-600 transition-colors text-white";
const styleBlue = "bg-blue-500 hover:bg-blue-600 transition-colors text-white";
const styleRed = "bg-red-500 hover:bg-red-600 transition-colors text-white";
const styleGrey =
  "bg-[#eeeeee] hover:bg-neutral-300 transition-colors text-primary";
const styleStuti = "";

function NativeButton({ type, IconType, text, onClick }) {
  type = String(type).toLowerCase();

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await onClick();
      }}
      className={`outline-none px-3 py-2 font-bold whitespace-nowrap rounded-lg border-none flex place-items-center ${
        type === "blue"
          ? styleBlue
          : type === "green"
          ? styleGreen
          : type === "grey"
          ? styleGrey
          : type === "stuti"
          ? styleStuti
          : type === "red"
          ? styleRed
          : styleGrey
      }`}
    >
      {IconType && IconType({ fontSize: 18, className: "mr-1 inline-block" })}
      {text}
    </button>
  );
}

export default NativeButton;
