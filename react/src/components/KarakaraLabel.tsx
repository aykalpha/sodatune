
import { KarakaraList } from "../constants/constants";
type KarakaraLabelProps = {
  karakara_id: number;
  isHovered: boolean;
};

export default function KarakaraLabel({ karakara_id , isHovered}: KarakaraLabelProps) {
  const karakara = KarakaraList[karakara_id-1];
  return (
    // @TODO:ネオン風な影つけでもいい、あと反射アニメーションがあってもいい
    <span
      className={`px-2 py-1 text-sm rounded-full border transition-colors duration-300 ${
        isHovered ? karakara.base : karakara.hover
      }`}
    >
      {karakara.label}
    </span>
  );
}
