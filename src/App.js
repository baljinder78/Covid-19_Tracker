import React from 'react';


import {Charts , Cards } from './components';
import styles from './App.module.css';
import { fetchData } from './api';


class App extends React.Component {

    state={
        data:{},
    }

   async componentDidMount(){
        const data= await fetchData();
        this.setState({data : data});
    }


    render() {
        const {data}=this.state;
        return (
             <div className={styles.container}>
                 <h1>COVID-19 Tracker</h1>   
            <Cards data={data}/>
            <Charts />
            
             </div>
        )
    }
}

export default App;