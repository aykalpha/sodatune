export const KarakaraList: { 
  id: number; 
  label: string; 
  base: string; 
  hover: string; 
}[] = [
  { id: 1, label: "しっとり", base: "bg-sky-400/70 border border-sky-400", hover: "bg-sky-500/30 border border-sky-500" },
  { id: 2, label: "ちょいカラ", base: "bg-yellow-400/70 border border-yellow-400", hover: "bg-yellow-500/30 border border-yellow-500" },
  { id: 3, label: "カラカラ", base: "bg-red-400/70 border border-red-400", hover: "bg-red-500/30 border border-red-500" },
];

type KarakaraLabelProps = {
  karakara_id: number;
  isHovered: boolean;
};

export default function KarakaraLabel({ karakara_id , isHovered}: KarakaraLabelProps) {
  const karakara = KarakaraList[karakara_id-1];
  return (
    <span
      className={`px-2 py-1 text-sm rounded-full border transition-colors duration-300 ${
        isHovered ? karakara.base : karakara.hover
      }`}
    >
      {karakara.label}
    </span>
  );
}
