import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async() => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);


        return { confirmed, recovered, deaths, lastUpdate };


    } catch (error) {

    }
}

export const fetchDailydata = async() => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((Dailydata) => ({
            confirmed: Dailydata.confirmed.total,
            deaths: Dailydata.deaths.total,
            recovered: Dailydata.recovered.total,
            date: Dailydata.reportDate,
        }));
        console.log(modifiedData);
        return modifiedData;
    } catch (error) {

    }
}