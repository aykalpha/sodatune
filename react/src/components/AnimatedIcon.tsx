import React, { FC } from "react";
import "./AnimatedIcon.css";

type AnimatedIconProps = {
  Icon: React.ElementType;
  isHovered: boolean;
};

const AnimatedIcon: FC<AnimatedIconProps> = ({ Icon, isHovered}) => {
  return <Icon className={`${isHovered ? "animate-shake" : ""}`} />;
};

export default AnimatedIcon;
