import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import OpacityIcon from "@mui/icons-material/Opacity";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Card from "./Card";
import AnimatedIcon from "./AnimatedIcon";

//@TODO:潅水のカレンダーが白すぎ問題
//@TODO:ロゴがなじんでいない
//@TODO:ユーザーの余白なさすぎ
//@TODO:土壌水分量ではなく土壌分析がいいかも（虫眼鏡アイコンとかで。EC値、日照時間、温度、湿度とかも管理したい）
type SidebarProps = {
  user: {
    name: string;
    avatar?: string;
    email?: string;
  };
};

// ✅ imgをReactコンポーネント化してAnimatedIconに渡せるようにする
const AvatarIcon = ({ src }: { src: string }) => (
  <img
    src={src}
    alt="avatar"
    className="w-10 h-10 rounded-full border border-white"
  />
);

export default function Sidebar({ user }: SidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = "http://localhost:8000/logout";
    localStorage.removeItem("token");
  };

  const menuItems = [
    { icon: ScienceIcon, label: "分析", path: "/" },
    { icon: WbSunnyIcon, label: "天気", path: "/weather" },
    { icon: EditNoteIcon, label: "記録", path: "/journal" },
    { icon: AssignmentTurnedInIcon, label: "管理", path: "/manager" },
    { icon: OpacityIcon, label: "潅水", path: "/irrigation" },
    { icon: AgricultureIcon, label: "収穫", path: "/harvest" },
  ];

  return (
    <Card>
      <div className="flex flex-col h-full justify-between">
        {/* ユーザー情報部分 */}
        <div>
          <div className="flex items-center gap-2">
            {/* ✅ AnimatedIconを使って画像を揺らす */}
            <AnimatedIcon
              Icon={() => (
                <AvatarIcon
                  src={
                    user.avatar ||
                    "https://www.gravatar.com/avatar/?d=mp&s=80"
                  }
                />
              )}
              isHovered={hoveredIndex === 999} // 常にfalseなら静止、trueなら揺れる
            />
            <div className="flex flex-col justify-center leading-tight">
              <span>{user.name}</span>
              <span className="text-xs text-white/70">{user.email}</span>
            </div>
          </div>

          {/* メニューリスト */}
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 px-2 py-2 mt-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
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

        {/* ログアウトボタン */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-white/20 rounded-2xl py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
          >
            {/* @TODO:アニメーションつけてもいい */}
            <AnimatedIcon Icon={LogoutIcon} isHovered={false} />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
