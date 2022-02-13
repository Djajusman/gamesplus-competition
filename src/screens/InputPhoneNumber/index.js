import React, {Component} from "react";
import {Text, Center, Box, Button, Flex, Input} from "native-base";
import AppBar from "../../components/Base/AppBar";
import Loader from 'react-loader-spinner'

import { createTransaction } from "../../api";

class InputPhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuePhoneNumber: '',
            messageError:'',
            isLoading: false,
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id'))
        };

        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    }

    componentDidMount() {

    }

    handleChangePhoneNumber(event) {
        const regexNumber = /^[0-9\b]+$/

        if(regexNumber.test(event.target.value)){
            this.setState({ valuePhoneNumber: `${event.target.value}` });
        }
    }

    handleNext = () => {
        const {valuePhoneNumber, token, idCompetition} = this.state
        const {
            history: { replace }
        } = this.props;

        const data = {
            phone_number: String(valuePhoneNumber),
            competition_id: idCompetition
        }

        if(valuePhoneNumber.length > 9 ) {
            this.setState({
                isLoading: true
            })
            createTransaction(data, token).then((res => {
                if(res.data.status && res.data.status.code === 0) {
                    // success handle
                    localStorage.setItem("phoneNumber", valuePhoneNumber)
                    localStorage.setItem("orderId", res.data.data && res.data.data.order_id )
                    this.setState({
                        isLoading: false
                    })
                    replace('/verification')
    
                }else {
                    this.setState({
                        messageError: res.data.status && res.data.status.message_client,
                        isLoading: false
                    })
                }
            })).catch((err) => {
                this.setState({
                    isLoading: false
                })
            })
        }
    }

    handleBack = () => {
        const {
            history: { replace }
        } = this.props;

        replace('/payment-detail')
    }

    render(){

        const {handleChangePhoneNumber,handleNext } = this

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
                <AppBar title="Input Phone Number" onBackPress={()=> this.handleBack()}/>
                <Center py="4" style={{paddingHorizontal:"36px"}}>
                    <Text color={'#8F8F8F'} style={{fontSize:"14px", fontWeight:"600", marginTop:"32px", textAlign:"center", lineHeight:"16px"}}>Input your MotionPay</Text>
                    <Text color={'#8F8F8F'} style={{fontSize:"14px", fontWeight:"600", textAlign:"center", lineHeight:"16px"}}>registered phone number</Text>
                </Center>

                <Input type="number" size="xl" value={this.state.valuePhoneNumber} onChange={handleChangePhoneNumber} variant="underlined" placeholder="Input phone number" style={{marginHorizontal:"24px", marginTop:"84px", textAlign:"center"}}/>
                {this.state.messageError.length > 0 && 
                    <Text color={'#FA262F'} style={{fontSize:"14px", fontWeight:"400", textAlign:"center", lineHeight:"16px", marginTop:"8px"}}>{this.state.messageError}</Text>
                }
                
                <Center style={{alignItems:"center", alignContent:"center", alignSelf:"center", marginTop:"50px"}}>
                    <Button onPress={handleNext} style={{marginTop:"32px", width:"250px", height:"36px", backgroundColor:this.state.valuePhoneNumber.length > 9 ? "#FA262F" : "#8F8F8F", borderRadius:"7px", marginVertical:"8px"}}>
                        <Center>
                            <Flex direction="row" style={{alignItems:"center"}}>
                                <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>Next</Text>
                            </Flex>
                        </Center>
                    </Button>
                </Center>
            </Box>
            </>
        )
    }
}

export default InputPhoneNumber