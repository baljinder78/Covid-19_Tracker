import React from 'react';


import {Charts , Cards, Countrypicker } from './components';  

import styles from './App.module.css';
import { fetchData } from './api';


class App extends React.Component {

    state={
        data:{},
        country:"",
        text:""
    }

    handlecountrychange= async (country)=>{
        const fetcheddata= await fetchData(country);
        this.setState({data:fetcheddata,country:country,text:"The Covid-19 data of "+country});
    }

   async componentDidMount(){
        const data= await fetchData();
        this.setState({data : data});
    }


    render() {
        const {data,country,text}=this.state;

        return (
            
             <div className={styles.container}>
                 <h1>COVID-19 Tracker </h1>
                 <h3>{text}</h3>
            <Cards data={data}/>
            <Countrypicker handlecountrychange={this.handlecountrychange}/>
            <Charts data={data} country={country} />
            
             </div>
        )
        
    }
}

export default App;