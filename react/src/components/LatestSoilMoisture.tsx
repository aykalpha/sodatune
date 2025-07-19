import { useEffect, useState } from 'react';
import axios from 'axios';
import { SOIL_MOISTURE_LATEST } from '../constants/api';

interface SoilMoisture {
    moisture: number;
    karakara_id: number;
}
function LatestSoilMoisture() {
    const [latestSoilMoisture, setLatestSoilMoisture] = useState<SoilMoisture | null>(null);

    useEffect(() => {
        getLatestSoilMoisture();
    }, []);

    // 最新の土壌水分量を取得
    async function getLatestSoilMoisture() {
        try {
            const response = await axios.get(SOIL_MOISTURE_LATEST);
            setLatestSoilMoisture(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <p>土壌水分量: {latestSoilMoisture?.moisture}</p>
            <p>カラカラ指数ID: {latestSoilMoisture?.karakara_id}</p>
        </div>
    );
}

export default LatestSoilMoisture;
