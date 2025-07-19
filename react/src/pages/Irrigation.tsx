import IrrigationButton from '../components/IrrigationButton';
import IrrigationCalendar from '../components/IrrigationCalendar';
import IrrigationTable from '../components/IrrigationTable';

function Irrigation() {
  return (
    <div>
      <h2>灌漑</h2>
      <IrrigationButton />
      <IrrigationCalendar />
      <IrrigationTable />
    </div>
  );
}

export default Irrigation;
