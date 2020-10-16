import axios from 'axios';
import { apiBaseUrl } from "../constants";

export const checkService = async () => {  
    console.log(`Try to ping ${apiBaseUrl}/ping`);
    const { data: pong } = await axios.get<string>(`${apiBaseUrl}/ping`);
    console.log(`Answer was ${pong}`);
}
