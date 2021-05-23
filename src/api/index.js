import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async(country) => {
    let changeableurl = url;
    if (country) {
        changeableurl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableurl);


        return { confirmed, recovered, deaths, lastUpdate };


    } catch (error) {
        console.log(error);
    }
}

export const fetchDailydata = async() => {
    try {
        const { data } = await axios.get(`${url}/daily`);    //https://covid19.mathdro.id/api/daily

        const modifiedData = data.map((Dailydata) => ({   
            confirmed: Dailydata.confirmed.total,
            deaths: Dailydata.deaths.total,
            recovered: Dailydata.recovered.total,
            date: Dailydata.reportDate,
        }));
        return modifiedData;
    } catch (error) {

    }
}

export const fetchCountry = async() => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((contry) => contry.name);
    } catch (error) {
        console.log(error);
    }
}

