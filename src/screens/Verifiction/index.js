import React, {Component} from "react";
import {Text, Center, Box, Flex, Input} from "native-base";
import AppBar from "../../components/Base/AppBar";
import { payTransaction, createTransaction } from "../../api";
import Loader from 'react-loader-spinner'

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuePhoneNumber: '',
            isLoading: false,
            valueOtp: '',
            otp1: "", 
            otp2: "", 
            otp3: "", 
            otp4: "", 
            otp5: "", 
            otp6:"",
            valueFlagError:"",
            time: {
            }, 
            seconds: 60,
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id'))
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        
        // handle local storage
        this.handleLocalStorage()
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer()
    }

    handleOtpProses = () => {
        if(this.state.otp6.length > 0){
            this.handlePay()
        }
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }

    handlePay = () => {
        const {
            valuePhoneNumber,
            otp1,
            otp2,
            otp3,
            otp4,
            otp5,
            otp6,
            token
        } = this.state

        const {
            history: { replace }
        } = this.props;

        const dataOtp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`
        const orderId = localStorage.getItem("orderId")
        console.log("orderId", dataOtp)

        const data = {
            phone_number: valuePhoneNumber,
            auth_code: dataOtp,
            order_id: orderId
        }
        payTransaction(data, token).then((res => {
            this.setState({
                isLoading: false
            })

            if(res.data.status && res.data.status.code === 0) {
                //handle success
                this.setState({
                    isLoading: false
                })

                localStorage.setItem("purchaseId", res.data.data && res.data.data.purchase_id)
                replace('/success-payment')
            } else {
                if((res.data.status && res.data.status.message_server === "SPIN_ID_NOT_REGISTERED") ||
                (res.data.status && res.data.status.message_server === "AUTH_CODE_NOT_VALID")){
                    this.setState({
                        valueFlagError: res.data.status && res.data.status.message_client
                    })
                } else {
                    // handle failed
                    replace('/failed-payment')
                }
            }
            console.log("data pay", res)
        })).catch((err) => {
            this.setState({
                isLoading: false
            })
        })


    }

    handleChange(value1, event) {
        this.setState({ [value1]: event.target.value });

        if(value1 === "otp6") {
            this.setState({
                isLoading: true
            })
            setTimeout(
                function() {
                    this.setState({
                        isLoading: true
                    })
                    this.handleOtpProses()
                }
                .bind(this),
                1000
            );
        }
    }

    handleLocalStorage = () => {
        this.setState({
            valuePhoneNumber: localStorage.getItem("phoneNumber")
        })
    }

    inputfocus = (elmnt, tabIndex) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = tabIndex - 2;
            if (next > -1) {
                elmnt.target.form.elements[next].focus()
            }
        }
        else {
            console.log("next");
        
            const next = tabIndex
            if (next < 6) {
                elmnt.target.form.elements[next].focus()
            }
        }

    }

    handleBack = () => {
        const {
            history: { replace }
        } = this.props;

        replace('/input-phone-number')
    }
    
    handleResend = () => {
        const competitonId = localStorage.getItem('competitionId')
        const phoneNumber = localStorage.getItem('phoneNumber')

        const data = {
            phone_number: String(phoneNumber),
            competition_id: parseInt(competitonId)
        }

        createTransaction(data, this.state.token).then((res => {
            if(res.data.status && res.data.status.code === 0) {
                this.setState({
                    isLoading: false
                })

            }else {
                this.setState({
                    valueFlagError: res.data.status && res.data.status.message_client,
                    isLoading: false
                })
            }
        })).catch((err) => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {

        const {valuePhoneNumber, otp1, otp2, otp3, otp4, otp5, otp6} = this.state
        return(

            <>
                {this.state.isLoading &&(
                    <Box style={{position:"absolute", marginTop:"50vh", zIndex:"20", marginLeft:"42%"}}>
                        <Center>
                            <Loader  type="Oval" color="#FA262F" height={60} width={60}/>
                        </Center>
                    </Box>
                )}
                <Box style={{background:"#282828", minHeight:"100vh"}}>
                    <AppBar title="Verification" onBanckPress={()=> this.handleBack()}/>
                    {this.state.valueFlagError.length > 0 && (
                        <Box style={{width:"100%", height:"32px", padding:"6px", backgroundColor:"#8F0000"}}>
                            <Center>
                                <Text color={'#FFFFFF'} style={{fontSize:"14px",marginTop:"2px", fontWeight:"400", textAlign:"center", lineHeight:"16px"}}>Wrong verification code</Text>
                            </Center>
                        </Box>
                    )}
                    <Center>
                        <Text color={'#FFFFFF'} style={{fontSize:"14px", fontWeight:"400", marginTop:"40px", textAlign:"center", lineHeight:"16px"}}>Verification code sent to</Text>
                        <Text color={'#FFFFFF'} style={{fontSize:"14px", fontWeight:"700", marginTop:"8px", textAlign:"center", lineHeight:"16px"}}>{valuePhoneNumber}</Text>
                        <Text color={'#FFFFFF'} style={{fontSize:"14px", fontWeight:"400", marginTop:"16px", textAlign:"center", lineHeight:"16px"}}>Input verification code below</Text>
                    </Center>
                    <form>
                        <Flex direction="row" style={{marginHorizontal:"30px", marginTop:"64px"}}>
                            <Input
                                name="otp1"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%"}}
                                value={otp1}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp1", e)}
                                tabIndex="1" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 1)}
                            />
                            <Input
                                name="otp2"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%",  marginLeft:"12px", textAlign:"center"}}
                                value={otp2}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp2", e)}
                                tabIndex="2" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 2)}
                            />
                            <Input
                                name="otp3"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%",  marginLeft:"12px", textAlign:"center"}}
                                value={otp3}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp3", e)}
                                tabIndex="3" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 3)}
                            />
                            <Input 
                                name="otp4"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%",  marginLeft:"12px", textAlign:"center"}}
                                value={otp4}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp4", e)}
                                tabIndex="4" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 4)}
                            />
                            <Input
                                name="otp5"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%",  marginLeft:"12px", textAlign:"center"}}
                                value={otp5}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp5", e)}
                                tabIndex="5" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 5)}
                            />
                            <Input
                                name="otp6"
                                type="text"
                                autoComplete="off"
                                size="xl"
                                variant="underlined"
                                style={{width:"15%",  marginLeft:"12px", textAlign:"center"}}
                                value={otp6}
                                onKeyPress={this.keyPressed}
                                onChange={e => this.handleChange("otp6", e)}
                                tabIndex="6" 
                                maxLength="1" 
                                onKeyUp={e => this.inputfocus(e, 6)}
                            />
                        </Flex>
                    </form>

                    {this.state.time.s > 0? (
                        <Text color={'#FFFFFF'} style={{fontSize:"14px", fontWeight:"400", marginTop:"30px", textAlign:"center", lineHeight:"16px"}}>Resend code <span style={{color:"#FA262F"}}>{this.state.time.m}:{this.state.time.s}</span> </Text>

                    ):(
                        <Text onPress={()=> this.handleResend()} underline color={'#FA262F'} style={{fontSize:"14px",fontVariant:"underline", fontWeight:"400", marginTop:"30px", textAlign:"center", lineHeight:"16px"}}>Resend code</Text>
                    )}
                </Box>
            </>
        )
    }
}

export default Verification