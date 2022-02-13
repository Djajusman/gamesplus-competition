import React, { Component } from "react";
import {
    Box,
    Image,
    Text,
    Center,
    VStack,
    Accordion,
    Flex,
    HStack
} from 'native-base';
import InformationSign from '../../../../assets/images/information-sign.svg';
import CardPrize from "../../../../components/Molecules/CardPrize"
import { getDetailCompetition } from "../../../../api";
export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetails: [],
            dataDetail: [],
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id')),
            _isMounted : false
        }
    }

    componentDidMount() {
        // this.getDataLocalStorage()
        this._isMounted = true;
        this.getDataDetailCompetition()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getDataLocalStorage = () => {
        const dataToken = localStorage.getItem('token')
        const idGame = localStorage.getItem('id')
        this.setState({
            token: dataToken,
            idCompetition: parseInt(idGame)
        })
    }

    getDataDetailCompetition = () => {
        const {token, idCompetition} = this.state

        getDetailCompetition(idCompetition, token).then((res) => {
            if (this._isMounted) {
                this.setState({
                    dataDetails: res.data && res.data.data && res.data.data.prize,
                    dataDetail: res.data && res.data.data && res.data.data,
                    dataImage: res.data && res.data.data && res.data.data.meta_img,
                })
            }
        })
            .catch((err) => {
                throw err;
            });
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
    
    render() {
        const { dataDetails, dataDetail } = this.state
        var rows = [], i = 0, len = 10;
        while (++i <= len) rows.push(i);
        return (

            <><h2>Details</h2><h2>Leaderboard</h2>
                <Box bg="#282828" style={{ marginHorizontal: "16px" }}>
                    <Box border={1} borderRadius='md'>
                        <VStack space={4}>
                            <Text className="details" style={{fontSize:"12px"}}>
                                <div dangerouslySetInnerHTML={{ __html: dataDetail.details }} />
                            </Text>
                        </VStack>
                    </Box>
                    <Box style={{ marginBottom: "10px" }}>

                        <Center>
                            <div style={{color:"white", borderRadius:"7px"}} dangerouslySetInnerHTML={{ __html: dataDetail.register_detail }} />
                        </Center>
                    </Box>
                </Box>
                <div style={{ marginBottom: "95px" }}>
                    <Accordion allowMultiple defaultIndex={[0, 1, 2]} style={{ borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0 }} divider={false}>
                        <Accordion.Item>
                            <Accordion.Summary style={{ borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, backgroundColor: '#1A1A1A' }} _expanded={{ backgroundColor: '#1A1A1A' }} _hover={false}>
                                <h3>
                                    Prizes
                                </h3>
                                <Accordion.Icon color={"white"} />
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Center>
                                    <Box>
                                        <Flex direction="row">
                                            <Box style={{ backgroundColor: 'black', borderRadius: "7px", height: "24px", width: "100%", paddingVertical: "4px", marginBottom: "8px" }}>
                                                <HStack space={2} alignItems="center">
                                                    <Flex direction="column">
                                                        <Flex direction="row" style={{ marginBottom: "4px", marginLeft: "8px", marginRight: "10px" }}>
                                                            <Image source={{ uri: InformationSign }} style={{ width: "10px", height: "10px", marginTop: "2px", marginRight:"1px" }} />
                                                            <Text className="detailReward" style={{fontSize:"10px"}}>This reward points will be given at MotionPay account.</Text>
                                                        </Flex>
                                                    </Flex>
                                                </HStack>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Center>
                                <Box>
                                    {dataDetails == null ? (
                                        <Box>
                                            <Center>
                                            <Text className="details" style={{fontWeight:"400", fontSize:"21px", marginTop:"16px"}}>Data Tidak Ditemukan</Text>
                                            </Center>
                                        </Box>
                                    ): <CardPrize
                                        dataPrize={dataDetails}
                                        />
                                    }
                                </Box>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary style={{ borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, backgroundColor: '#1A1A1A' }} _expanded={{ backgroundColor: '#1A1A1A'}} _hover={false}>
                                <h3>
                                    Term & Condition
                                </h3>
                                <Accordion.Icon color={"white"} />
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text className="details" style={{fontSize:"12px"}}>
                                    {/* {dataDetail.term_condition} */}
                                    <div dangerouslySetInnerHTML={{ __html: dataDetail.term_condition }} />
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary style={{ borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0, backgroundColor: '#1A1A1A' }} _expanded={{ backgroundColor: '#1A1A1A' }} _hover={false}>
                                <h3>
                                    Frequently Asked Questions
                                </h3>
                                <Accordion.Icon color={"white"} />
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text className="details" style={{fontSize:"12px"}}>
                                    {/* {dataDetail.faq} */}
                                    <div dangerouslySetInnerHTML={{ __html: dataDetail.faq }} />
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </>
        )
    };
}