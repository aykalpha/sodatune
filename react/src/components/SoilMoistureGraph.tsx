import { useEffect, useState } from 'react';
import axios from 'axios';
import { SOIL_MOISTURES } from '../constants/api';

// TODO:型の共通化
interface SoilMoisture {
    id: number;
    measured_at: string;
    moisture: number;
    karakara_id: number;
    notified: boolean;
    created_at: string;
    updated_at: string;
}

function SoilMoistureGraph() {
    const [soilMoistureList, setSoilMoistureList] = useState<SoilMoisture[]>([]);

    useEffect(() => {
        getSoilMoisture();
    }, []);

    // 土壌水分量一覧を取得
    // TODO:useHook化、テーブルと共通化
    async function getSoilMoisture() {
        try {
            const response = await axios.get(SOIL_MOISTURES);
            setSoilMoistureList(response.data as SoilMoisture[]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {soilMoistureList?.map((soilMoisture: SoilMoisture) => (
                <div>
                    <p >{soilMoisture.measured_at}</p>
                    <p >{soilMoisture.moisture}</p>
                </div>
            ))}
        </div>
    );
}

export default SoilMoistureGraph;
