import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers : [
                  { driver_id : 'D001', name : 'Andrew - ID : D001'},
                  { driver_id : 'D002', name : 'Bruce - ID : D002'},
                  { driver_id : 'D003', name : 'Charlie - ID : D003'}
                ],
      orders  : [
                  {
                      "order_id": "001",
                      "order_date": "2020/02/01",
                      "sender_name": "Albert",
                      "sender_full_address": "Los Angeles International Airport",
                      "recipient_name": "John",
                      "recipient_full_address": "Westwood, Los Angeles",
                      "latitude_from": 33.943485, 
                      "longitude_from": -118.408208,
                      "latitude_to": 34.067763,
                      "longitude_to": -118.422318
                  },
                  {
                      "order_id": "002",
                      "order_date": "2020/02/01",
                      "sender_name": "Ben",
                      "sender_full_address": "Los Angeles International Airport",
                      "recipient_name": "George",
                      "recipient_full_address": "10600 Wilshire Blvd",
                      "latitude_from": 33.943485, 
                      "longitude_from": -118.408208,
                      "latitude_to": 34.061577,
                      "longitude_to": -118.433476
                  },
                  {
                      "order_id": "003",
                      "order_date": "2020/02/01",
                      "sender_name": "Chris",
                      "sender_full_address": "Los Angeles International Airport",
                      "recipient_name": "Michael",
                      "recipient_full_address": "10931-10949 Wilshire Blvd",
                      "latitude_from": 33.943485, 
                      "longitude_from": -118.408208,
                      "latitude_to": 34.058519,
                      "longitude_to": -118.444902
                  },
                  {
                      "order_id": "004",
                      "order_date": "2020/02/01",
                      "sender_name": "Donny",
                      "sender_full_address": "Los Angeles International Airport",
                      "recipient_name": "Lucas",
                      "recipient_full_address": "Hollywood",
                      "latitude_from": 33.943485, 
                      "longitude_from": -118.408208,
                      "latitude_to": 34.0977269,
                      "longitude_to": -118.341585
                  },
                  {
                      "order_id": "005",
                      "order_date": "2020/02/01",
                      "sender_name": "Egon",
                      "sender_full_address": "Los Angeles International Airport",
                      "recipient_name": "Debbie",
                      "recipient_full_address": "4165 Beverly Blvd",
                      "latitude_from": 33.943485, 
                      "longitude_from": -118.408208,
                      "latitude_to": 34.076665,
                      "longitude_to": -118.300430
                  }
                ],
      ordersSelected : [],
      driversSelected : [],

      orderValueSelected : '',
      orderIndexSelected : 0,
      driverValueSelected : '',
      driverIndexSelected : 0,

      strDriversSelected : '',
      strOrdersSelected : '',

      kmeansresult : []
    }
    this.driverChange = this.driverChange.bind(this);
    this.orderChange = this.orderChange.bind(this);
    this.selectDriver = this.selectDriver.bind(this);
    this.selectOrder = this.selectOrder.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  driverChange(event) {
    this.setState({
      driverValueSelected : event.target.value,
      driverIndexSelected : event.target.selectedIndex
    });
  }

  orderChange(event) {
    this.setState({
      orderValueSelected : event.target.value,
      orderIndexSelected : event.target.selectedIndex
    });
  }

  selectDriver() {
    var data = this.state.driversSelected;
    var strDriversSelected = this.state.strDriversSelected;
    var exist = false;
    var i = 0;
    while (exist===false && i<data.length) {
      if (data[i].value===this.state.driverValueSelected) {
        exist = true;
      }
      i++;
    }
    if (exist===false) {
      strDriversSelected+=this.state.drivers[this.state.driverIndexSelected].name + ', ';
      data.push({value : this.state.driverValueSelected, index : this.state.driverIndexSelected});
      this.setState({
        driversSelected : data,
        strDriversSelected : strDriversSelected
      });
    }
    else {
      alert('Driver is already selected');
    }
  }

  selectOrder() {
    var data = this.state.ordersSelected;
    var strOrdersSelected = this.state.strOrdersSelected;
    var exist = false;
    var i = 0;
    while (exist===false && i<data.length) {
      if (data[i].value===this.state.orderValueSelected) {
        exist = true;
      }
      i++;
    }
    if (exist===false) {
      strOrdersSelected+=this.state.orders[this.state.orderIndexSelected].order_id + ' - To ' + this.state.orders[this.state.orderIndexSelected].recipient_name + ' - ' + this.state.orders[this.state.orderIndexSelected].recipient_full_address + ', ';
      data.push({value : this.state.orderValueSelected, index : this.state.orderIndexSelected});
      this.setState({
        ordersSelected : data,
        strOrdersSelected : strOrdersSelected
      });
    }
    else {
      alert('Order is already selected');
    }
  }

  clearAll() {
    this.setState({
      ordersSelected : [],
      driversSelected : [],

      orderValueSelected : '',
      orderIndexSelected : 0,
      driverValueSelected : '',
      driverIndexSelected : 0,

      strDriversSelected : '',
      strOrdersSelected : '',
      kmeansresult : []
    });
  }

  handleSubmit(event) {
    var i = 0;
    var orders = [];
    for(i=0;i<this.state.ordersSelected.length;i++) {
      orders.push(this.state.orders[this.state.ordersSelected[i].index]);
    }
    var drivers = [];
    for(i=0;i<this.state.driversSelected.length;i++) {
      drivers.push(this.state.drivers[this.state.driversSelected[i].index]);
    }
    var data = {
        'orders' : orders,
        'drivers' : drivers
    };
    return fetch('http://localhost:1338/assigndrivers', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(r =>  r.json().then((data) => {
      if (r.status==200) {
        this.setState({
          kmeansresult : data
        });
      }
      else {
        alert('error');
      } 
    }))
    .catch((error)=>{
        alert(error);
    });
  }

  render() {
    var kmeansresult = null;
    var i = 0;
    if (this.state.kmeansresult) {
        kmeansresult= this.state.kmeansresult.map((dr)=>{
            return (
                <div>
                  <label><u>Driver</u> : {dr.name} </label><br/>
                  <label>&nbsp;&nbsp;<u>Orders Assigned</u> : </label><br/>
                  {
                    dr.ordersAssigned.map((item)=>{
                      return (
                        <div>
                          <label>&nbsp;&nbsp;&nbsp;{item.order_id + ' : ' + item.recipient_name + ' - ' + item.recipient_full_address}</label><br/>
                        </div>
                      )
                    })
                  }
                  <p/>
                </div>
            )
        });
    }
    return (
      <form>
        <table border="0">
          <tr>
            <th align="left"><u>K-Means using Node.js and React</u></th>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <label>
                Select driver : &nbsp;
                <select value={this.state.driverValue} onChange={this.driverChange}>
                  <option value="D001">Andrew - ID : D001</option>
                  <option value="D002">Bruce - ID : D002</option>
                  <option value="D003">Charlie - ID : D003</option>
                </select>&nbsp;
                <button type="button" onClick={this.selectDriver}>Select</button>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <b>Selected Drivers</b> : &nbsp;
                {this.state.strDriversSelected}
              </label>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <label>
                Select order : &nbsp;
                <select value={this.state.orderValue} onChange={this.orderChange}>
                  <option value="001">001 - To John - Westwood, Los Angeles</option>
                  <option value="002">002 - To George - 10600 Wilshire Blvd</option>
                  <option value="003">003 - To Chris - 10931-10949 Wilshire Blvd</option>
                  <option value="004">004 - To Lucas - Hollywood</option>
                  <option value="005">005 - to Debbie - 4165 Beverly Blvd</option>
                </select>&nbsp;
                <button type="button" onClick={this.selectOrder}>Select</button>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <b>Selected Orders</b> : &nbsp;
                {this.state.strOrdersSelected}
              </label>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <label>
              <b>K-Means result : </b>&nbsp;
              {kmeansresult}
            </label>
          </tr>
        </table>
        <p/>
        <p/>
        <button type="button" onClick={this.clearAll}>Clear</button>
        <button type="button" onClick={this.handleSubmit}>Assign Orders using K-Means</button>
      </form>
    );
  }
}

