import React, { FC, useEffect, useState } from "react";
import "./MoistureCell.css";

type MoistureCellProps = {
  moisture: number;
  isHovered: boolean;
};

const MoistureCell: FC<MoistureCellProps> = ({ moisture, isHovered}) => {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    if (isHovered) {
      setAnimateKey((prev) => prev + 1);
    }
  }, [isHovered]);

  return (
    <div className="flex items-center gap-2">
      {/* 数値表示 */}
      <span>{moisture}%</span>

      {/* バー */}
      <div className="bar-container">
        <div key={animateKey} 
        className="bar-fill bar-animate"        
        style={{ "--bar-width": `${moisture}%` } as React.CSSProperties} />
      </div>
    </div>
  );
};

export default MoistureCell;
