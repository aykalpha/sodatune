import LatestSoilMoisture from '../components/LatestSoilMoisture';
import SoilMoistureGraph from '../components/SoilMoistureGraph';
import SoilMoistureTable from '../components/SoilMoistureTable';
function SoilMoisture() {
  return (
    <div>
      <h2>土壌水分量</h2>
      <LatestSoilMoisture />
      <SoilMoistureGraph />
      <SoilMoistureTable />
    </div>
  );
}

export default SoilMoisture;
