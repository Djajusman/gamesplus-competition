import React, {Component} from "react";
import {Image, Text, Center, Box, Button, Flex} from "native-base";
import AppBar from "../../components/Base/AppBar";

import visionPlus from "../../assets/images/vision+.svg"
import paymentMotion from "../../assets/images/paymentMotion.svg"

class  PaymentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameGame: localStorage.getItem('gameName'),
            priceGame:localStorage.getItem('gamePrice')
        };
    }

    componentDidMount() {
        // this.getFromLocalStorage()
    }

    getFromLocalStorage = () => {
        const gameName = localStorage.getItem('gameName')
        const gamePrice = localStorage.getItem('gamePrice')

        this.setState({
            nameGame: gameName,
            priceGame: gamePrice
        })
    }

    formatRupiah = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp '+ribuan;
    }

    formatRibuan = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join(',').split('').reverse().join('');
        return ribuan;
    }

    handleToInput = () => {
        const {
            history: { replace }
          } = this.props;
        
        replace('/input-phone-number')
    }

    handleBack = () => {
        const {
            history: { replace }
          } = this.props;
        
        replace('/motion-pay')
    }

    render(){
        const {nameGame, priceGame} = this.state
        return(
            <>
                <Box style={{background:"#282828", minHeight:"100vh"}}>
                    <AppBar title="Payment Detail" onBackPress={()=> this.handleBack()}/>
                    <Center py="4" style={{paddingHorizontal:"38px"}}>
                        <Image source={visionPlus} style={{ width:"160px", height:"30px", marginTop:"23px" }}/>
                        <Text color={'#fff'} style={{fontSize:"21px", fontWeight:"600", marginTop:"16px", textAlign:"center"}}>RCTI+ Games</Text>
                    </Center>
                    <hr style={{height:"1px", borderTop:"1px", color:"#E5E5E5", marginLeft:"16px",marginRight:"16px", marginTop:"30px", width:"91%"}}/>
                    <Text color={'#fff'} style={{fontSize:"16px", fontWeight:"600", marginTop:"24px", marginLeft:"16px"}}>{nameGame}</Text>
                    <Flex direction="row">
                        <Text color={'#fff'} style={{fontSize:"10px", fontWeight:"600", marginTop:"24px", marginLeft:"26px"}}>Total Payment</Text>
                        <Text color={'#fff'} style={{fontSize:"10px", fontWeight:"600", marginTop:"24px", marginLeft:"26px", position:"absolute", right:"0", marginRight:"24px"}}>{this.formatRupiah(priceGame)}</Text>
                    </Flex>
                    <hr style={{ border:"none", borderTop: "2px dashed #E5E5E5", width:"91%", backgroundColor:"#282828", marginTop:"24px", marginBottom:"24px", marginLeft:"16px"}}/>
                    <Flex direction="row">
                        <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginLeft:"26px"}}>Total</Text>
                        <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginLeft:"26px", position:"absolute", right:"0", marginRight:"24px"}}>{this.formatRupiah(priceGame)}</Text>
                    </Flex>
                    <hr style={{height:"1px", borderTop:"1px", color:"#E5E5E5", marginLeft:"16px",marginRight:"16px", marginTop:"30px", width:"91%"}}/>

                    <Text color={'#fff'} style={{fontSize:"16px", fontWeight:"600", marginTop:"24px", marginLeft:"16px"}}>Payment Method</Text>
                    <Flex direction="row">
                        <Image source={paymentMotion} style={{ width:"124px", height:"32px", marginTop:"18px", marginLeft:"16px" }}/>
                        <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginLeft:"26px", position:"absolute", right:"0", marginRight:"24px", marginTop:"26px"}}>MotionPay</Text>
                    </Flex>

                    <Center style={{position:"absolute", bottom:"0", marginBottom:"32px", alignItems:"center", alignContent:"center", alignSelf:"center"}}>
                        <Button onPress={() => this.handleToInput()} style={{marginTop:"32px", width:"250px", height:"36px", backgroundColor:"#FA262F", borderRadius:"7px", marginVertical:"8px"}}>
                            <Center>
                                <Flex direction="row" style={{alignItems:"center"}}>
                                    <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>Purchase</Text>
                                </Flex>
                            </Center>
                        </Button>
                    </Center>
                </Box>
            </>
        )
    
    }
    
}

export default PaymentDetail