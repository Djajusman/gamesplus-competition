import React, {Component} from "react";
import {Image, Text, Center, Box} from "native-base";
import AppBar from "../../components/Base/AppBar";
import failed from "../../assets/images/failed.svg"
import Loader from 'react-loader-spinner'

class FailedPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {

    }
    render(){

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
                    <AppBar title="Failed Page" noBackButton={true}/>
                    <Center py="4" style={{paddingHorizontal:"48px"}}>
                        <Text color={'#fff'} style={{fontSize:"21px", fontWeight:"400", marginTop:"48px", textAlign:"center"}}>Kamu tidak memiliki akses ke halaman ini.</Text>
                        <Image source={failed} style={{ width:"144px", height:"137px", marginTop:"83px" }}/>
                    </Center>
                </Box>
            </>
        )
    }
}

export default FailedPayment