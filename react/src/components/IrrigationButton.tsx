import axios from 'axios';
import { IRRIGATIONS } from '../constants/api';

function IrrigationButton() {

    async function handleClick() {

        try {
            const response = await axios.post(IRRIGATIONS, {
                irrigated_at: new Date(),
            });
            // TODO:データの再取得
        } catch (e) {
            console.error(e);
        }

    }

    return (
        <button onClick={handleClick}>
            潅水
        </button>
    );
}

export default IrrigationButton;
