export const KarakaraList: { 
  id: number; 
  label: string; 
  descriptions: string;
  base: string; 
  hover: string; 
}[] = [
  { id: 1, label: "カラカラ", descriptions:"土壌水分量が「0～30%」です。", base: "bg-red-400/70 border border-red-400", hover: "bg-red-500/30 border border-red-500" },
  { id: 2, label: "ちょいカラ", descriptions:"土壌水分量が「31～60%」です。", base: "bg-yellow-400/70 border border-yellow-400", hover: "bg-yellow-500/30 border border-yellow-500" },
  { id: 3, label: "しっとり", descriptions:"土壌水分量が「61～100%」です。", base: "bg-cyan-400/70 border border-cyan-400", hover: "bg-cyan-500/30 border border-cyan-500" },
];
