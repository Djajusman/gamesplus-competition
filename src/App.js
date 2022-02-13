import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// ga init
import PageViewGa from "./config/PageViewGa";
// competition page
import Competition from "./screens/Competition";
import MotionPay from "./screens/MotionPay";
import SuccessPayment from "./screens/SuccessPayment"
// import Login from "./screens/Login";
// import EditProfile from "./screens/EditProfile";
import PlayGames from "./screens/Competition/PlayGames";
import PlaymWeb from "./screens/Competition/PlaymWeb";
import PaymentDetail from "./screens/PaymentDetail"
import InputPhoneNumber from "./screens/InputPhoneNumber";
import Verification from "./screens/Verifiction";
import FailedPayment from "./screens/FailedPayment"
import Error404 from './screens/Error404'

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataGame: [],
      token: "",
      idCompetition:0
    }
  }
  
  componentDidMount() {
    this.getDataGamesInfo()
  }
  
  getDataGamesInfo = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')
    const search_url = window.location.href.split("/").slice(-2)[0]
    localStorage.setItem("id", search_url)
    localStorage.setItem('token', token)
  }
  
  render() {
    const queryParams = new URLSearchParams(window.location.search)
    const search_url = window.location.href.split("/").slice(-2)[0]
    const search_url_2 = window.location.href.split("/").slice(-1)[0]

    const token = queryParams.get('token')
    const type = queryParams.get('type')
    localStorage.setItem('token', token)
    localStorage.setItem('deviceType', type)
    localStorage.setItem("id", search_url)
    localStorage.setItem("param", search_url_2)
    // console.log("url",search_url)
    // console.log("param",search_url_2)
    // console.log("query",token);
    // console.log("query_2",type);
    
    return (
      <>
        <Router>
          {token !== "" ? (
              <Switch>
                {/* Router for competition */}
                <Route exact path="/competition/:id/:param" component={PageViewGa(Competition)} />
                {/* Router for motion pay */}
                <Route exact path="/motion-pay" component={PageViewGa(MotionPay)} />
    
                <Route exact path="/success-payment" component={PageViewGa(SuccessPayment)} />
    
                {/* <Route exact path="/login" component={Login} /> */}
    
                {/* <Route exact path="/edit-profile" component={PageViewGa(EditProfile)} /> */}
                {/* Router for play mWeb */}
                <Route exact path="/play-mweb" component={PageViewGa(PlaymWeb)} />
                <Route exact path="/play-games" component={PageViewGa(PlayGames)} />
                <Route exact path="/payment-detail" component={PageViewGa(PaymentDetail)} />
                <Route exact path="/input-phone-number" component={PageViewGa(InputPhoneNumber)} />
                <Route exact path="/verification" component={PageViewGa(Verification)} />
                <Route exact path="/failed-payment" component={PageViewGa(FailedPayment)} />
                <Route exact path="/page-error" component={PageViewGa(Error404)} />
                {/* <Redirect from="*" to="/competition/:id/:name" /> */}
              </Switch>
          ):(
            <Switch>
               <Route exact path="/" component={PageViewGa(Error404)} />
               <Redirect from="*" to="/" />
            </Switch>
          )}
          
        </Router>
      </>
    );
  }
}