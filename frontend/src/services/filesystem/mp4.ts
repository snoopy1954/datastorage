import axios from 'axios';
import { apiBaseUrl } from "../../constants";


const getOne = async (folder: string) => {
    const { data: list } = await axios.get<string>(
        `${apiBaseUrl}/mp4/${folder}`
    );

    return list;
}

export { getOne }
