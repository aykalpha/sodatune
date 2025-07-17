import { useEffect, useState } from 'react';
import axios from 'axios';
import { IRRIGATIONS } from '../constants/api';

interface Irrigation {
    id: number;
    irrigated_at: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

function IrrigationTable() {
    const [irrigations, setIrrigations] = useState<Irrigation[]>([]);

    useEffect(() => {
        getIrrigations();
    }, []);

    // 潅水一覧を取得
    async function getIrrigations() {
        try {
            const response = await axios.get(IRRIGATIONS);
            setIrrigations(response.data as Irrigation[]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>潅水ID</th>
                    <th>潅水日時</th>
                    <th>ユーザーID</th>
                    <th>作成日時</th>
                    <th>更新日時</th>
                </tr>
            </thead>
            <tbody>
                {irrigations.map((irrigation) => (
                    <tr key={irrigation.id}>
                        <td>{irrigation.id}</td>
                        <td>{irrigation.irrigated_at}</td>
                        <td>{irrigation.user_id}</td>
                        <td>{irrigation.created_at}</td>
                        <td>{irrigation.updated_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default IrrigationTable;
