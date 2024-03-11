import { CustomIcons } from "./CustomIcons";

const QuickBox = ({ Options, side = "left" }) => {
  return (
    <div
      className={` z-[99999] absolute top-[120%] ${
        side === "left" ? "left-0" : "right-0"
      } rounded-lg backdrop-blur-md bg-gray-100 bg-opacity-75 max-w-fit shadow-md text-black overflow-hidden`}
    >
      {Options?.map((option, index) => {
        return (
          <div key={index}>
            {index !== 0 && <div className="h-[1px] bg-gray-200" />}
            <div
              className={`${index === 0 ? "pt-[11px] pb-1" : ""} ${
                index === Options?.length - 1 ? "pb-[11px] pt-1" : " py-2"
              } hover:bg-neutral-200 flex justify-start items-center`}
            >
              <p
                className="hover:text-white cursor-pointer text-black flex whitespace-nowrap items-center gap-2 my-1 px-4"
                onClick={option.action}
              >
                {/* <CustomIcons Icon={option.icon} /> */}
                <CustomIcons Icon="FaUserShield" />
                {option.heading}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickBox;

