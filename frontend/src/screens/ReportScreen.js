import React, {Component} from "react";
import InfoBox from './InfoBox';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

class  ReportScreen extends Component{
    constructor(props){
        super(props);
        this.state = { totaluser :0 };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/users/totaluser').then(response => {this.setState({
            totaluser : response.data
        })})
    }
   render(){
  return (
    <>
        <div className="breadcrumb">
             <div className="container">
                <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                <span className="breadcrumb-item active">Report</span>
             </div>
        </div>
         <section className="static about-sec">
            <div className="container">
                <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'report'} />
                        </div>
                <div className="col-10">
                    <div className="app_header">
                        <h1> REPORT </h1>
                    </div>
                    <div className="app_stats">
                        <InfoBox title="No of Users" total={this.state.totaluser} />
                        <InfoBox title="No of Orders" total={300} />
                        <InfoBox title="No of Pending Orders" total={400} />
                        <InfoBox title="No of Products" total={200}/>
                        <InfoBox title="Total Sales" total={200000}/>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </>
    );
  }
}

export default ReportScreen;