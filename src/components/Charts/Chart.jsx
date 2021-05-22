import React, { useEffect , useState } from 'react';
import {fetchDailydata} from '../../api/index';
import {Line,Bar} from 'react-chartjs-2';

import styles from './chart.module.css';

const Chart=({data :{ confirmed, recovered, deaths, lastUpdate },country}) =>
{
  
    const [dailydata,setDailyData] = useState([]);

    useEffect(() => {
        
        const fetchApi = async ()=>{
            setDailyData(await fetchDailydata());
        }

        fetchApi();

    },[]);

    const lineChart=(
        
        dailydata.length
        ?
        (<Line
            data={{
                labels : dailydata.map(({date}) => date),
                datasets : [{
                    data : dailydata.map(({confirmed}) => confirmed),
                    label : "Infected",
                    borderColor: 'blue',
                    fill: true
                },{
                    data : dailydata.map(({deaths}) => deaths),
                    label : "Deaths",
                    borderColor: 'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill: true

                },
                {
                    data : dailydata.map(({recovered}) => recovered),
                    label : "recovered",
                    borderColor: 'orange',
                    fill: true

                },
            ],

            }}
        />)
        :
        null
        
    )
    
    const barchart=(
    
        confirmed 
        ?
        (
            <Bar 
            data={{
                labels:["Infected","Recovred","Deaths"],
                datasets:[{
                    label:"People",
                    backgroundColor:['rgba(62, 76, 81, 0.5)','rgb(44, 200, 30, 0.5)','rgba(207, 0, 0, 0.5)',],
                    data:[confirmed.value,recovered.value,deaths.value],
                }]
            }}
            option={{
                legend:{display:false},
                title:{ display:true, text:`Current state in ${country}`},
            }}
            />
        )
        :
        null
    );

    return(
        <div className={styles.container}>
            {country? barchart: lineChart}
        </div>
    )
}

export default Chart;