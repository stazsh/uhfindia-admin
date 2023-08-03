import { useNavigate } from "react-router-dom";

function TabBar({ tabs, activeTabTitle }) {
  const navigate = useNavigate();

  return (
    <div className="h-16 sticky top-0 bg-white border-b border-boundary flex flex-row justify-between flex-shrink-0">
      <div id="dash-tabs" className="h-full w-fit flex flex-row">
        {tabs.map((i) => (
          <div
            key={i.title}
            tabIndex={0}
            className={`h-full  flex place-items-center text-sm ml-5 p-2 capitalize select-none font-semibold ${
              i.title === activeTabTitle
                ? "text-blue-500 border-b-blue-500"
                : "text-secondary hover:border-b-blue-400 hover:text-blue-400"
            } border-y-4 border-white transition-colors uppercase cursor-pointer box-border outline-none`}
            onClick={() => navigate(i.navlink().slice(0, -2))}
          >
            {i.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabBar;
