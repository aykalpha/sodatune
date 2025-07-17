import { useEffect, useState } from 'react';
import axios from 'axios';
import { SOIL_MOISTURES } from '../constants/api';

interface SoilMoisture {
    id: number;
    measured_at: string;
    moisture: number;
    karakara_id: number;
    notified: boolean;
    created_at: string;
    updated_at: string;
}

function SoilMoistureTable() {
    const [soilMoistureList, setSoilMoistureList] = useState<SoilMoisture[]>([]);

    useEffect(() => {
        getSoilMoisture();
    }, []);

    // 土壌水分量一覧を取得
    async function getSoilMoisture() {
        try {
            const response = await axios.get(SOIL_MOISTURES);
            setSoilMoistureList(response.data as SoilMoisture[]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <table>
            <thead >
                <tr>
                    <th >土壌水分量ID</th>
                    <th >測定日時</th>
                    <th >土壌水分量</th>
                    <th >カラカラ指数</th>
                    <th >通知</th>
                </tr>
            </thead>
            <tbody>
                {soilMoistureList?.map((soilMoisture: SoilMoisture) => (
                    <tr key={soilMoisture.id}>
                        <td >{soilMoisture.id}</td>
                        <td >{soilMoisture.measured_at}</td>
                        <td >{soilMoisture.moisture}</td>
                        <td >{soilMoisture.karakara_id}</td>
                        <td >
                            {soilMoisture.notified && 'アラームマーク'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SoilMoistureTable;
