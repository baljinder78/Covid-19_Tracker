import React, { useEffect , useState } from 'react';
import {fetchDailydata} from '../../api/index';
import {Line} from 'react-chartjs-2';

import styles from './chart.module.css';

const Chart=() =>
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
    
    return(
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;