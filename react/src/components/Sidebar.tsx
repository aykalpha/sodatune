import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Card from "./Card";
import AnimatedIcon from "./AnimatedIcon";
import Logo from "./Logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//@TODO:潅水のカレンダーが白すぎ問題
//@TODO:ロゴがなじんでいない
//@TODO:ユーザーの余白なさすぎ
//@TODO:土壌水分量ではなく土壌分析がいいかも（虫眼鏡アイコンとかで。EC値、日照時間、温度、湿度とかも管理したい）
export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { icon: WaterDropIcon, label: "土壌水分量", path: "/" },
    { icon: OpacityIcon, label: "潅水", path: "/irrigation" },
    { icon: WbSunnyIcon, label: "天気", path: "/weather" },
    { icon: EditNoteIcon, label: "記録", path: "/journal" },
    { icon: AgricultureIcon, label: "作業管理", path: "/manager" },
  ];

  return (
    <Card>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* @TODO:ロゴは分割した独自のアニメーションでもいい */}
          <Logo />
          <div className="flex items-center gap-2">
            <AccountCircleIcon sx={{ fontSize: 48 }} />
            <div className="flex flex-col justify-center leading-tight">
              <span>あやか</span>
              <span className="text-xs text-white/70">aykalpha@gmail.com</span>
            </div>
          </div>

          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`
                  flex gap-4 px-2 py-2 mt-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(item.path)}
              >
                <AnimatedIcon
                  Icon={item.icon}
                  isHovered={hoveredIndex === index}
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3">
          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              border
              border-white/20
              rounded-2xl
              py-2
              text-sm
              text-white/80
              hover:bg-white/10
              hover:text-white transition-all
              backdrop-blur-md
            "
          >
            {/* @TODO:アニメーションつけてもいい */}
            <AnimatedIcon
              Icon={LogoutIcon}
              isHovered={false}
            />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
