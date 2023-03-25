import axios from 'axios';

export const getRandomQuote = async () => {
    const { data } = await axios.get('https://api.quotable.io/random');
    return data as Quotable;
};
