import axios from 'axios';

export const getIpGeolocation = async () => {
    const { data } = await axios.get('https://ip-api.com/json/');
    return data as IPGeolocation;
};
