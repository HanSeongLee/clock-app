import axios from 'axios';

export const getIpGeolocation = async () => {
    const { data } = await axios.get('/api/ip-geolocation');
    return data as IPGeolocation;
};
