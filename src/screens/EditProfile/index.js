import React, {Component} from "react";
import {Image, Text, Center, Box, Button, Input} from "native-base";
import AppBar from "../../components/Base/AppBar";
import profile from "../../assets/images/profileUser.svg"
import camera from "../../assets/images/camera.svg"
import close from '../../assets/images/close.svg'

import 'react-html5-camera-photo/build/css/index.css';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.handleClickCamera = this.handleClickCamera.bind(this);
    }

    componentDidMount() {

    }

    handleClickCamera(e) {
        this.refs.fileUploader.click();
    }


    render() {
        return(
            <>
                <Box style={{background:"#282828", minHeight:"100vh"}}>
                    <AppBar title="Edit Profile"/>
                    <Center style={{paddingHorizontal:"30px"}}>
                        <Image source={profile} style={{ width:"105px", height:"105px", marginTop:"16px" }}/>
                        <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
                        <Button onPress={()=> this.handleClickCamera()} style={{width:"34px", height:"34px", borderRadius:"16px", position: "absolute", top:"90px", backgroundColor:"#FA262F", marginLeft:"70px"}}>
                            <Image source={camera} style={{ width:"19px", height:"17px", margin:"8px"}}/>
                        </Button>
                    </Center>
                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginTop:"30px", marginBottom:"8px",  marginHorizontal:"22px"}}>Gender user name</Text>
                    <Input
                        variant="underlined"
                        marginLeft="22px"
                        marginRight="22px"
                        size="md"
                        
                        InputRightElement={
                            <Image source={close} style={{ width:"14px", height:"14px", marginRight:"8px"}}/>
                        }
                        placeholder="Gender user name"
                    />

                    <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginTop:"30px", marginBottom:"8px",  marginHorizontal:"22px"}}>Bio</Text>
                    <Input variant="underlined" placeholder="Aku adalah gammer" size="md" style={{marginHorizontal:"22px"}}/>
                    
                    <Center style={{height:"50vh"}}>
                        <Box style={{background:"#FA262F", height:"36px", width:"250px", borderRadius:"7px", position:"absolute", bottom:"0px"}}>
                            <Center>
                                <Text color={'#fff'} style={{fontSize:"12px", fontWeight:"700", marginTop:"8px"}}>Next</Text>
                            </Center>
                        </Box>
                    </Center>
                
                </Box>
            </>
        )
    }
}