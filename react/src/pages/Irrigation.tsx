import IrrigationButton from "../components/IrrigationButton";
import IrrigationCalendar from "../components/IrrigationCalendar";
import IrrigationTable from "../components/IrrigationTable";
export default function Irrigation() {
  return (
   <div className="flex-[5] flex flex-col gap-10">
    <div>
      <IrrigationCalendar />
    </div>
      <div className="flex gap-10 h-full">
        <div className="flex-[1]">
          <IrrigationButton />
        </div>
        <IrrigationTable />
      </div>
    </div>
  );
}
