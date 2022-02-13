import React, {Component} from "react";
import {Image, Text, Center, Box, Button} from "native-base";
import AppBar from "../../components/Base/AppBar";
// import {useWindowDimensions} from "react-native-web";

import motion from "../../assets/images/motion-pay.svg"
import playstore from "../../assets/images/playstore.svg"
import appstore from "../../assets/images/appstore.svg"
import next from "../../assets/images/next.svg"

class MotionPay extends Component {

    handleBackPress =()=> {
        const {
            history: { replace }
        } = this.props;

        replace(`competition/${localStorage.getItem('id')}/${localStorage.getItem('gameName')}?token=${localStorage.getItem('token')}`)
    }

    handleButtonPress = () => {
        const {
            history: { replace }
        } = this.props;

        replace('/payment-detail')
    }
    render(){
        return(
            <Box style={{background:"linear-gradient(180deg, #0079FF 0%, #2E51A4 100%)", height:"100vh"}}>
                <AppBar title="Motion Pay" onBackPress={() => this.handleBackPress()}/>
                <Center py="4" style={{paddingHorizontal:"38px"}}>
                    <Image source={motion} style={{ width:"256px", height:"67px", marginTop:"16px" }}/>
                    <Text color={'#fff'} style={{fontSize:"18px", fontWeight:"700", marginTop:"48px", textAlign:"center"}}>Do you have MotionPay account?</Text>
                    
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"200", marginTop:"8px", textAlign:"center"}}><strong> MotionPay</strong> is the e-money app for all your needs. Using <strong> MotionPay</strong>, you can pay any transactions in <strong> RCTI+</strong>.</Text>
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"200", marginTop:"24px", textAlign:"center"}}>Download on</Text>
    
                    <Image source={playstore} style={{ width:"110px", height:"37px", marginTop:"14px", borderRadius:"4px" }}/>
                    <Image source={appstore} style={{ width:"110px", height:"37px", marginTop:"4px", borderRadius:"4px" }}/>
                </Center>
                <Center style={{position:"absolute", bottom:"0", marginBottom:"34px",alignSelf:"center"}}>
                    <Text italic underline color={'#fff'} style={{fontSize:"12px", fontWeight:"300", textAlign:"center", direction:""}}>Click here to learn more  {'>'}</Text>
                </Center>
                
                <Button onPress={()=> this.handleButtonPress()} style={{position:"absolute", bottom:"0", right:"0", margin:"24px", backgroundColor:"transparent"}}>
                    <Image source={next} style={{ width:"36px", height:"36px"}}/>
                </Button>
            
            </Box>
        )
    }
}

export default MotionPay