import React, { FC } from "react";
import "./AnimatedIcon.css";

type AnimatedIconProps = {
  Icon: React.ElementType;
  isHovered: boolean;
  size?: number;
};

const AnimatedIcon: FC<AnimatedIconProps> = ({ Icon, isHovered, size }) => {
  return (
    <Icon
      className={`${isHovered ? "animate-shake" : ""}`}
      style={{
        fontSize: size
      }}
    />
  );
};

export default AnimatedIcon;
