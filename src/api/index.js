import axios from 'axios';
const API_URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = API_URL;
    if (country) {
        changeableUrl = `${API_URL}/countries/${country}`;
    }
    try {
        const {
            data: { confirmed, deaths, recovered, lastUpdate }
        } = await axios.get(changeableUrl);

        return { confirmed, deaths, recovered, lastUpdate };
    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/daily`);
        return (
            data.length &&
            data.map(({ confirmed, deaths, reportDate }) => ({
                confirmed: confirmed.total,
                deaths: deaths.total,
                date: reportDate
            }))
        );
    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = async () => {
    try {
        const {
            data: { countries }
        } = await axios.get(`${API_URL}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
};
