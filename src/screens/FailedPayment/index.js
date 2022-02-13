import React, {Component} from "react";
import {Image, Text, Center, Box, Flex, Button} from "native-base";
import AppBar from "../../components/Base/AppBar";
import failed from "../../assets/images/failed.svg"
import { createTransaction } from "../../api";
import Loader from 'react-loader-spinner';
import Meta from "../../components/atoms/Meta";

class FailedPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            token: localStorage.getItem('token')
        };
    }

    componentDidMount() {

    }

    handleBack = () => {
        const {
            history: { replace }
        } = this.props;

        replace('/verification')
    }

    handleBackToGameDetail = () => {
        const {
            history: { replace }
        } = this.props;

        replace(`competition/${localStorage.getItem('id')}/${localStorage.getItem('gameName')}?token=${localStorage.getItem('token')}`)
    }

    handleResend = () => {
        const competitonId = localStorage.getItem('competitionId')
        const phoneNumber = localStorage.getItem('phoneNumber')

        const data = {
            phone_number: String(phoneNumber),
            competition_id: parseInt(competitonId)
        }

        this.setState({
            isLoading: true
        })

        const {
            history: { replace }
        } = this.props;

        createTransaction(data, this.state.token).then((res => {
            if(res.data.status && res.data.status.code === 0) {
                this.setState({
                    isLoading: false
                })
                replace('/verification')

            }else {
                this.setState({
                    // valueFlagError: res.data.status && res.data.status.message_client,
                    isLoading: false
                })
            }
        })).catch((err) => {
            this.setState({
                isLoading: false
            })
        })
    }

    render(){
        const metaInfo = {
            meta_title: 'Error Pembayaran',
            meta_desc: localStorage.getItem('meta_desc'), 
            meta_keyword: localStorage.getItem('meta_keyword'),
            meta_img: localStorage.getItem('meta_img'),
            img_url: localStorage.getItem('meta_img'),
        }

        return(
            <>
                <Meta info={metaInfo} />
                {this.state.isLoading &&(
                    <Box style={{position:"absolute", marginTop:"50vh", zIndex:"20", marginLeft:"42%"}}>
                        <Center>
                            <Loader  type="Oval" color="#FA262F" height={60} width={60}/>
                        </Center>
                    </Box>
                )}
                <Box style={{background:"#282828", minHeight:"100vh"}}>
                    <AppBar title="Failed Payment" onBackPress={()=> this.handleBack()}/>
                    <Center py="4" style={{paddingHorizontal:"48px"}}>
                        <Text color={'#fff'} style={{fontSize:"21px", fontWeight:"400", marginTop:"48px", textAlign:"center"}}>Your payment has failed. Please resend a new purchase.</Text>
                        <Image source={failed} style={{ width:"144px", height:"137px", marginTop:"83px" }}/>
                    </Center>

                    <Center style={{position:"absolute", bottom:"0", marginBottom:"32px", alignItems:"center", alignContent:"center", alignSelf:"center"}}>
                        <Button onPress={()=> this.handleResend()} style={{marginTop:"32px", width:"250px", height:"36px", backgroundColor:"#FA262F", borderRadius:"7px"}}>
                            <Center>
                                <Flex direction="row" style={{alignItems:"center"}}>
                                    <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>Resend Purchase</Text>
                                </Flex>
                            </Center>
                        </Button>
                        <Button onPress={()=> this.handleBackToGameDetail()} style={{marginTop:"10px", width:"250px", height:"36px", backgroundColor:"#FFF", borderRadius:"7px"}}>
                            <Center>
                                <Flex direction="row" style={{alignItems:"center"}}>
                                    <Text color={'#FA262F'} style={{fontWeight:"bold", fontSize:"14px"}}>Back to Game Detail</Text>
                                </Flex>
                            </Center>
                        </Button>
                    </Center>
                </Box>
            </>
        )
    }
}

export default FailedPayment
