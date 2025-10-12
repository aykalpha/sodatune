import axios from "axios";
import { IRRIGATIONS } from "../constants/api";
import AnimatedIcon from "./AnimatedIcon";
import OpacityIcon from "@mui/icons-material/Opacity";
import { useState } from "react";
import Wave from "react-wavify";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function IrrigationButton() {
  const [hovered, setHovered] = useState(false);
  const [filled, setFilled] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    axios
      .post(IRRIGATIONS, { irrigated_at: new Date() })
      .then(() => setFilled(true))
      .catch(console.error);
  };
  const handleTransitionEnd = () => {
    if (filled) {
      navigate(0);
    }
  };

  return (
    <Card>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className="
          min-w-[150px]
          h-full
          overflow-hidden
        "
      >
        <div className="absolute inset-0" onTransitionEnd={handleTransitionEnd}>
          <Wave
            fill="url(#waveGradient)"
            paused={false}
            className="absolute inset-0 h-[120%]"
            style={{
              transform: filled
                ? "translateY(-15%)"
                : hovered
                ? "translateY(25%)"
                : "translateY(55%)",
              transition: "transform 2s ease-in-out",
            }}
          />
          <svg>
            <linearGradient id="waveGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="rgba(80, 190, 255, 0.25)" />
              <stop offset="45%" stopColor="rgba(0, 120, 255, 0.25)" />
              <stop offset="100%" stopColor="rgba(0, 120, 255, 0.4)" />
            </linearGradient>
          </svg>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <AnimatedIcon Icon={OpacityIcon} isHovered={hovered} size={80} />
          <span className="text-xl font-semibold">
            {filled ? "潅水完了！" : "潅水する"}
          </span>
        </div>
      </button>

    </Card>
  );
}