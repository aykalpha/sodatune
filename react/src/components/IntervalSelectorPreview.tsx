import { useState } from "react";

export default function IntervalSelectorPreview() {
  const [selected, setSelected] = useState("6時間");
  const [pattern, setPattern] = useState(1);

  const labels = ["6時間", "12時間", "24時間"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
      <h1 className="text-2xl font-bold mb-6">計測間隔セレクター プレビュー</h1>

      {/* パターン切り替えボタン */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPattern(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm border transition-all ${
              pattern === i + 1
                ? "bg-white/20 border-white/40"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            Pattern {i + 1}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-lg w-[480px]">
        <h2 className="text-lg mb-3 font-semibold">Pattern {pattern}</h2>

        {pattern === 1 && (
          // ① カードトグル
          <div className="flex gap-3">
            {labels.map((label) => (
              <div
                key={label}
                onClick={() => setSelected(label)}
                className={`px-4 py-3 rounded-2xl border cursor-pointer transition-all backdrop-blur-sm ${
                  selected === label
                    ? "border-white/40 bg-white/20"
                    : "border-white/10 bg-white/5 hover:bg-white/15"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {pattern === 2 && (
          // ② ラジオボタン風
          <div className="flex flex-col gap-2">
            {labels.map((label) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={selected === label}
                  onChange={() => setSelected(label)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selected === label ? "bg-white border-white" : "border-white/40"
                  }`}
                />
                {label}
              </label>
            ))}
          </div>
        )}

        {pattern === 3 && (
          // ③ スライダー
          <div className="flex flex-col gap-3">
            <input
              type="range"
              min="6"
              max="24"
              step="6"
              value={parseInt(selected)}
              onChange={(e) => setSelected(e.target.value + "時間")}
              className="accent-white w-full"
            />
            <span className="text-center">{selected}</span>
          </div>
        )}

        {pattern === 4 && (
          // ④ タグチップ
          <div className="flex gap-2 flex-wrap">
            {labels.map((label) => (
              <span
                key={label}
                onClick={() => setSelected(label)}
                className={`px-4 py-1.5 rounded-full border cursor-pointer transition-all backdrop-blur-sm ${
                  selected === label
                    ? "bg-white/25 border-white/40 text-white"
                    : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {pattern === 5 && (
          // ⑤ セレクトボックス
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white/80 backdrop-blur-sm w-full"
          >
            {labels.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        )}

        {pattern === 6 && (
          // ⑥ 円形レイアウト
          <div className="relative w-40 h-40 mx-auto">
            {labels.map((label, i) => {
              const angle = (i / labels.length) * 2 * Math.PI;
              const x = 60 + 40 * Math.cos(angle);
              const y = 60 + 40 * Math.sin(angle);
              return (
                <div
                  key={label}
                  className={`absolute cursor-pointer transition-all`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                  onClick={() => setSelected(label)}
                >
                  <div
                    className={`px-3 py-1 rounded-xl text-sm border ${
                      selected === label
                        ? "bg-white/20 border-white/40"
                        : "bg-white/5 border-white/20 hover:bg-white/15"
                    }`}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white/70">
              🔘
            </div>
          </div>
        )}

        {pattern === 7 && (
          // ⑦ トグルスイッチ風
          <div className="flex bg-white/10 border border-white/20 rounded-full p-1">
            {labels.map((label) => (
              <span
                key={label}
                onClick={() => setSelected(label)}
                className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all ${
                  selected === label
                    ? "bg-white/30 text-white"
                    : "text-white/60 hover:bg-white/20"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {pattern === 8 && (
          // ⑧ ドットインジケータ
          <div className="flex gap-6 justify-center">
            {labels.map((label) => (
              <div
                key={label}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelected(label)}
              >
                <span
                  className={`text-sm ${
                    selected === label ? "text-white" : "text-white/70"
                  }`}
                >
                  {label}
                </span>
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    selected === label ? "bg-white" : "bg-white/20"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {pattern === 9 && (
          // ⑨ タイムライン
          <div className="flex items-center gap-3 justify-center">
            {labels.map((label, i) => (
              <div
                key={label}
                className="flex items-center cursor-pointer"
                onClick={() => setSelected(label)}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selected === label ? "bg-white" : "bg-white/30"
                  }`}
                />
                {i < labels.length - 1 && (
                  <div className="w-8 h-px bg-white/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        )}

        {pattern === 10 && (
          // ⑩ 下線ハイライト
          <div className="flex gap-4 border-b border-white/20 justify-center">
            {labels.map((label) => (
              <div
                key={label}
                onClick={() => setSelected(label)}
                className="relative pb-1 cursor-pointer text-white/70 hover:text-white"
              >
                {label}
                {selected === label && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
