import React, {Component} from "react";
import {Image, Text, Center, Box, Flex, Button} from "native-base";
import AppBar from "../../components/Base/AppBar";

import success from "../../assets/images/success.svg"
import paymentMotion from "../../assets/images/paymentMotion.svg"
import Meta from "../../components/atoms/Meta";
class  SuccessPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueProductName: '',
            valueTotal:'',
            valuePurchaseId: ''
        };
    }

    componentDidMount() {
        this.getFromLocalStorage()
    }

    getFromLocalStorage = () => {
        const gameName = localStorage.getItem('gameName')
        const gamePrice = localStorage.getItem('gamePrice')
        const purchaseId = localStorage.getItem('purchaseId')

        this.setState({
            valueProductName: gameName,
            valueTotal: this.formatRupiah(gamePrice),
            valuePurchaseId: purchaseId
        })
    }

    formatRupiah = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp '+ribuan;
    }

    handlePlayNow = () => {
        localStorage.setItem('statusPayment', "PAID")
        const {
            history: { replace }
        } = this.props;
        replace('play-games')
    }
    render(){

        const {valueProductName,valuePurchaseId,valueTotal} = this.state
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
                <Box style={{background:"#282828", minHeight:"100vh"}}>
                    <AppBar title="Success Payment" noBackButton={true}/>
                    <Center py="4" style={{paddingHorizontal:"38px"}}>
                        <Text color={'#fff'} style={{fontSize:"21px", fontWeight:"400", marginTop:"48px", textAlign:"center"}}><strong>Payment is successful</strong> Your purchase is done.</Text>
                        <Image source={success} style={{ width:"144px", height:"137px", marginTop:"30px" }}/>
                    </Center>
    
                    <Box style={{padding:"10px", backgroundColor:"#3A3A3A", borderRadius:"7px", height:"87px", marginHorizontal:"34px", marginTop:"24px"}}>
                        <Flex direction="coloumn">
                            <Flex direction="row" width="100%">
                                <Text color="#8F8F8F" fontWeight="600" fontSize="12px">Purchase ID</Text>
                                <Text color="#FFF" fontWeight="400" fontSize="10px" style={{position:"absolute", right:"0px"}}>{valuePurchaseId}</Text>
                            </Flex>
                            <Flex direction="row" width="100%" marginTop="8px">
                                <Text color="#8F8F8F" fontWeight="600" fontSize="12px">Product</Text>
                                <Text color="#FFF" fontWeight="400" fontSize="10px" style={{position:"absolute", right:"0px"}}>{valueProductName}</Text>
                            </Flex>
                            <Flex direction="row" width="100%" marginTop="8px">
                                <Text color="#FFF" fontWeight="600" fontSize="12px">Total Payment</Text>
                                <Text color="#FFF" fontWeight="400" fontSize="10px" style={{position:"absolute", right:"0px"}}>{valueTotal}</Text>
                            </Flex>
                        </Flex>
                    </Box>
    
                    <Box style={{ backgroundColor:"#3A3A3A", borderRadius:"7px", height:"52px", marginHorizontal:"34px", padding:"18px", marginTop:"10px"}}>
                        <Flex direction="coloumn">
                            <Flex direction="row" width="100%">
                                <Text color="#FFF" fontWeight="600" fontSize="12px">Payment Method</Text>
                                
                            </Flex>
                        </Flex>
                        <Image source={paymentMotion} style={{ width:"72px", height:"20px", position:"absolute", right:"0px", marginRight:"18px"}}/>
                    </Box>
                    <Center>
                        <Button onPress={()=> this.handlePlayNow()} style={{marginTop:"32px", width:"250px", height:"36px", background:"linear-gradient(130.47deg, #37A8DA 5.6%, #00628B 93.94%)", borderRadius:"7px", marginVertical:"8px"}}>
                            <Center>
                                <Flex direction="row" style={{alignItems:"center"}}>
                                    <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>Play Now</Text>
                                </Flex>
                            </Center>
                        </Button>
                    </Center>
    
                </Box>
            </>
        )
    }
}

export default SuccessPayment
