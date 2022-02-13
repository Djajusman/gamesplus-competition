import React, {Component} from "react";
import {Image, Text, Center, Box, Input} from "native-base";
import AppBar from "../../components/Base/AppBar";

import view from '../../assets/images/view.svg'

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <>
            <Box style={{background:"#282828", height:"100vh"}}>
                <AppBar title="Log In" />

                <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginTop:"30px", marginBottom:"8px",  marginHorizontal:"22px"}}>Email or Phone Number</Text>
                <Input placeholder="insert email or phone number" size="md" style={{marginHorizontal:"22px"}}/>
                <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700",marginBottom:"8px", marginTop:"24px", marginHorizontal:"22px"}}>Password</Text>
                {/* <Input placeholder="Password" size="md" style={{marginHorizontal:"22px"}}/> */}
                <Input
                    marginLeft="22px"
                    marginRight="22px"
                    size="md"
                    
                    InputRightElement={
                        <Image source={view} style={{ width:"24px", height:"24px", marginRight:"8px"}}/>
                    }
                    placeholder="Password"
                />
                <Center>
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"600", marginTop:"30px", marginBottom:"30px",  marginHorizontal:"22px"}}>Forget Password?</Text>
                    <Box style={{background:"#FA262F", height:"36px", width:"250px", borderRadius:"7px"}}>
                        <Center>
                            <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginTop:"8px"}}>Log In</Text>
                        </Center>
                    </Box>
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"400", marginTop:"30px", marginBottom:"30px",  marginHorizontal:"22px"}}>Don’t have an account? <strong style={{color:"#FA262F"}}>Register</strong> here.</Text>
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"400", marginBottom:"30px",  marginHorizontal:"30px", textAlign:"center"}}>By clicking Sign in button, you agree to our <strong style={{color:"#FA262F"}}>Terms and Conditions</strong> and <strong style={{color:"#FA262F"}}>Privacy Policy.</strong></Text>
                </Center>
                
            </Box>
            </>
        )
    }

    
}
