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

// 今月の年月を取得
const getCurrentYearMonth = () => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() }; // month: 0-11
}

// 月の日数を取得
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}

function IrrigationCalendar() {
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

    const { year, month } = getCurrentYearMonth();
    const daysInMonth = getDaysInMonth(year, month);

    // 潅水日の日付(1~31)だけをセットに
    const irrigatedDaysSet = new Set<number>();
    irrigations.forEach(({ irrigated_at }) => {
        const date = new Date(irrigated_at);
        if (date.getFullYear() === year && date.getMonth() === month) {
            irrigatedDaysSet.add(date.getDate());
        }
    });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const isIrrigated = irrigatedDaysSet.has(day);
                return (
                    <div
                        key={day}
                        style={{
                            backgroundColor: isIrrigated ? 'red' : '',
                        }}
                    >
                        {day}
                    </div>
                );
            })}
        </div >
    );
}

export default IrrigationCalendar;
