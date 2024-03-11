import * as Icons from "react-icons/fa";

export const CustomIcons = ({ Icon }) => {
  const IconComponent = Icons[Icon];
  return <IconComponent className="inline-block py-1 px-[0.01rem] h-6 w-6" />;
};
