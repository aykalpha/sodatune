import JournalCalendar from "../components/JournalCalendar";
import Card from "../components/Card";

export default function Journal() {
  return (
    <div className="flex flex-row gap-10 w-full">
      <div className="flex flex-col gap-10 flex-[1] min-w-[300px]">
        <JournalCalendar />
        <JournalCalendar />
      </div>

      <div className="flex-[3]">
        <Card>
          <div className="flex">
            <div className="w-1/4 flex justify-center">
              <img
                src="https://www.hyponex.co.jp/websys/wp-content/uploads/2023/07/2-10mini.webp"
                alt="plant"
                className="rounded-xl w-[120px] h-[120px] object-cover shadow-md hover:scale-105 transition-transform"
              />
            </div>

            <div className="w-3/4 flex flex-col gap-2">
              <p>2025年10月04日（火）13:00</p>
              <p>
                コメント内容がここに入ります。植物の状態や潅水の感想など、
                ユーザーが記録した文章を表示できます。
              </p>
              <div className="flex items-center gap-2 justify-end">
                <div className="w-8 h-8 bg-white rounded-full" />
                <p>ユーザー名</p>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
