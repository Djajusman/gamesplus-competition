import {Text, Box, Center, Image, HStack, Flex, Icon, Button, Alert, VStack, IconButton, CloseIcon } from 'native-base';
import CoolTabs from '../../components/Molecules/Tabs'
// import { Dimensions, Animated, Pressable} from 'react-native';
import AppBar from "../../components/Base/AppBar";
import Meta from "../../components/atoms/Meta";
import JsonLd from "../../components/atoms/JsonLd";
import Styles from "../../index.css";
// Game+ of image. temporary cash
import share from "../../assets/images/share.svg"
import poin from "../../assets/images/poin.svg"
import error from "../../assets/images/subtract.svg"
import LinearGradient from "react-native-web-linear-gradient";
import React, {Component} from 'react';
// import ReactGa from 'react-ga'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../../index.css";
// sub competition
import Details from "./SubCompetition/Details";
import Leaderboard from "./SubCompetition/Leaderboard";
import Footer from '../../components/Molecules/Footer';
import PlaymWeb from '../Competition/PlaymWeb';
import { getGameInfo, getLeaderBoards, getUserPaymentInfo, getProfileInfo, getUserScore } from "../../../src/api";
import paymentMotion from "../../assets/images/paymentMotion.svg"
import Loader from 'react-loader-spinner'
import moment from 'moment';
import Modal from '../../components/Molecules/Modal'
const EventEmitter = require('events');

export const emitter = new EventEmitter();

const TextCustomStyle={
    color:"#8F8F8F",
    fontSize:"10px"
}

export default class Competition extends Component {
    showLeaderBoard = false;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataGameInfo:[],
            totalReward: "",
            dataLeader:[], 
            dataLeaderBoard:[],
            entryFee:"",
            height:0,
            statusPayment:"NOT_PAID_YET",
            showPopupMotionPay: false,
            errorMessage:"",
            errorMessageLeader:"",
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id')),
            deviceType: localStorage.getItem('deviceType'),
            dataScore: [],
            copyValue:"",
            copied: false,
            showAlert:false,
            showModal : false,
            showRank : false
        }
    }

    componentDidMount() {
        this.getGameInfoData()
        this.getDataLeaderboard()
        this.getHeightContent()
        this.getUserPaymentInfo()
        // this.initReactGa()
        this.getUserProfile()
        
    }
    
    getScoreUser = (userId) => {
        getUserScore(`/${userId}/competition/${this.state.idCompetition} `).then((res => {
            // console.log("resUserId", res.data && res.data.data)
            this.setState({
                dataScore: res.data && res.data.data,
                isLoading: false
            })
        })).catch((err) => {
            throw err;
        });
    }

    getUserProfile = () => {
        getProfileInfo(this.state.token).then((response => {
            // console.log("resUserId0-", response.data && response.data)
            if(response.data && response.data.status && response.data.status.code === 0) {
                const userId = response.data && response.data.data && response.data.data.id
                localStorage.setItem('userId', userId)
                this.getScoreUser(userId)
            } else if(response.data && response.data.status && response.data.status.code === 5) {
                const {
                    history: { replace }
                } = this.props;
                this.setState({
                    isLoading: false
                })
                replace('/page-error')
            } else {

            }
           
        })).catch((err) => {
            throw err;
        });
    }

    getDataLocalStorage = () => {
        const dataToken = localStorage.getItem('token')
        const idGame = localStorage.getItem('id')
        this.setState({
            token: dataToken,
            idCompetition: parseInt(idGame)
        })
    }

    getHeightContent = () => {
        const height = document.documentElement.offsetHeight;
        this.setState({ height: height });
    }

    getUserPaymentInfo = () => {
        const {token, idCompetition} = this.state
        getUserPaymentInfo(idCompetition,token).then((res => {
            localStorage.setItem('statusPayment', res.data && res.data.data && res.data && res.data.data.status)

            this.setState({
                statusPayment: res.data && res.data.data && res.data && res.data.data.status
            })
        })).catch((err) => {
            throw err;
        });
    }

    getDataLeaderboard = () => {
        const {token, idCompetition} = this.state
        getLeaderBoards(idCompetition, token).then((response) => {
            if(response === undefined){
                this.setState({
                    errorMessageLeader: "data tidak ditemukan"
                })
            } else if (response.data && response.data.status && response.data.status.code > 0) {
                this.setState({
                    errorMessageLeader: response.data && response.data.status && response.data.status.message_client
                })
            } else {
                // console.log("errorStatus--21121", response.data && response.data.data && response.data.data.leaderboards)
                this.setState({
                    dataLeader: response.data && response.data.data && response.data.data,
                    dataLeaderBoard: response.data && response.data.data && response.data.data.leaderboards,
                    entryFee: this.formatRupiah(response.data && response.data.data && response.data.data && response.data.data.entry_fee)
                })
            }
        })
        .catch((err) => {
            throw err;
        });
    }

    getGameInfoData = () => {
        const {token, idCompetition} = this.state

        this.setState({
            isLoading: true
        })
        // console.log("data Token", localStorage.getItem('token'))
        getGameInfo(idCompetition, token).then((res => {
            if(res.data.status && res.data.status.code > 0) {
                this.setState({
                    errorMessage: res.data.status && res.data.status.message_client
                })
            } else {
                localStorage.setItem('gameName', res.data && res.data.data && res.data.data.name);
                localStorage.setItem('competitionId', res.data && res.data.data && res.data.data.competition_id)
                this.setState({
                    dataGameInfo: res.data && res.data.data,
                    totalReward: this.formatRupiah(res.data && res.data.data && res.data && res.data.data.total_reward)
                })
                const value="https://visionplus.id/competition/{id_competition}/{competition_name}"
                const copyURL = value.replace('{id_competition}/{competition_name}', `${idCompetition}/${res.data && res.data.data && res.data.data.name}`)
                this.setState({
                    copyValue : copyURL
                })
            }

        })).catch((err) => {
            throw err;
        });
    }

    formatRupiah = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp'+ribuan;
    }

    formatRibuan = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join(',').split('').reverse().join('');
        return ribuan;
    }

    handleShowLeaderBoard = () => {
        return(
            <>
                <Center>
                    <Text style={{ fontSize: 22,marginHorizontal:"30px", marginVertical:"30px", fontWeight:"600", alignContent:"center", justifyContent:"center"}}>Data tidak ditemukan atau Kamu tidak memiliki akses</Text>
                    <Image source={{ uri: error }} style={{width:"60px", height:"60px"}}/>
                </Center>
                
            </>
        )
    }

    footerComponent = (showLeaderBoard) => {
        const { dataLeader, statusPayment, dataScore} = this.state
        return (
            <Box style={{ position: "fixed", width: "100%", zIndex: "20", bottom: 0 }}>
                <Footer
                    onPressButton={() => this.handleButtonPress()}
                    price={this.state.entryFee}
                    timeEnd={dataLeader.real_end_date}
                    mode={statusPayment === "PAID" ? "blue" : ""}
                    size={statusPayment === "PAID" ? "large" : ""}
                    platform={dataScore.source_platform}
                    positionRank={dataScore.rank_position}
                    positionPrems={this.formatOrdinal(dataScore.rank_position)}
                    nameRank={dataScore.name}
                    idGameRank={dataScore.user_id}
                    pointGameRank={dataScore.score}
                    lastPlayRank={dataScore.last_played}
                    emitter={emitter}
                />
            </Box>
        );
    }

    handleButtonPress = () => {
        try {
            if (this.state.deviceType === "android") {
                if (window.Android !== undefined){
                    window.Android.showToast("Success")
                }
            }
            if (this.state.deviceType === "ios") {
                if (typeof window.webkit.messageHandlers?.VersionHandler !== undefined){
                    window.webkit.messageHandlers.VersionHandler.postMessage({});
                }
            }
        }
        catch(err) {
            console.log(err);
            return (
                this.setState({showModal:true})
            )
        }
        if (this.state.statusPayment === "PAID") {
            const {
                history: { replace }
            } = this.props;
            
            replace('/play-games')
        }
        else{
            this.setState({
                showPopupMotionPay: true
            })
        }
        
    }
    
    handleButtonToMotionPay = () => {
        const {
            history: { replace }
        } = this.props;

        replace('/motion-pay')
    }

    formatOrdinal(i) {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return "st";
        }
        if (j === 2 && k !== 12) {
            return "nd";
        }
        if (j === 3 && k !== 13) {
            return "rd";
        }
        return "th";
    }

    render(){
        
        const {dataGameInfo, statusPayment, dataLeaderBoard, totalReward} = this.state
        localStorage.setItem('meta_desc', dataGameInfo.meta_desc)
        localStorage.setItem('meta_keyword', dataGameInfo.meta_keyword)
        localStorage.setItem('meta_img', dataGameInfo.meta_img)
        const jsonLdInfo = {
          name: dataGameInfo.name,
          metaImg: dataGameInfo.meta_img,
          metaDesc: dataGameInfo.meta_desc,
          imgUrl: dataGameInfo.img_url,
          endDate: dataGameInfo.end_date,
          startDate: dataGameInfo.start_date,
          totalReward
        }

        const handleTabClick = (key) => emitter.emit('show-rank', key === '2');

        return(
            <>
                <Meta info={dataGameInfo} totalReward={this.state.totalReward} />
                <JsonLd info={jsonLdInfo} />
                <Modal onClose={() => this.setState({
                        showModal: false
                    })} show={this.state.showModal}>
                        <PlaymWeb />
                </Modal>
                <AppBar title="Competition" />
            <div style={{minHeight:"400vh", backgroundColor:"#282828"}}>
                {this.state.showAlert? (
                    <Alert w="100%" status="success">
                        <VStack space={1} flexShrink={1} w="100%">
                        <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text
                                fontSize="md"
                                fontWeight="medium"
                                _dark={{
                                color: "coolGray.800",
                                }}
                            >
                                Link copied!
                            </Text>
                            </HStack>
                            <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="3" color="coolGray.600" />}
                            onPress={() => this.setState({
                                showAlert:false
                            })}
                            />
                        </HStack>
                        </VStack>
                    </Alert>
                    ):(
                        <>
                        </>
                )}

                {this.state.showPopupMotionPay && (
                    <Box borderTopRadius="25px" style={{position:"fixed", backgroundColor:"#1A1A1A", width:"100%", zIndex:"29", height:"272px", marginTop: window.innerHeight - 330 + "px"}}>
                        <Center>
                            <Box width="70px" backgroundColor="#fff" height="2px" marginTop="8px"/>
                        </Center>
                        <Box style={{padding:"10px", backgroundColor:"#3A3A3A", borderRadius:"7px", height:"64px", marginHorizontal:"34px", marginTop:"18px"}}>
                            <Flex direction="coloumn">
                                <Flex direction="row" width="100%">
                                    <Text color="#8F8F8F" fontWeight="600" fontSize="12px">Product</Text>
                                    <Text color="#FFF" fontWeight="400" fontSize="10px" style={{position:"absolute", right:"0px"}}>{dataGameInfo.name}</Text>
                                </Flex>
                                <Flex direction="row" width="100%" marginTop="8px">
                                    <Text color="#FFF" fontWeight="600" fontSize="12px">Total Payment</Text>
                                    <Text color="#FFF" fontWeight="600" fontSize="10px" style={{position:"absolute", right:"0px"}}>{this.state.entryFee}</Text>
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
                            <Text color="#FFF" fontWeight="400" fontSize="12px" marginTop="14px">By tapping button, you agree to our</Text>

                            <Text color="#FA262F" fontWeight="400" fontSize="12px">Terms & Conditions</Text>

                            <Center style={{marginTop:"14px", alignItems:"center", alignContent:"center", alignSelf:"center"}}>
                            <Button onPress={()=> this.handleButtonToMotionPay()} style={{ width:"250px", height:"36px", backgroundColor:"#FA262F", borderRadius:"7px"}}>
                                <Center>
                                    <Flex direction="row" style={{alignItems:"center"}}>
                                        <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>Open MotionPay</Text>
                                    </Flex>
                                </Center>
                            </Button>
                        </Center>
                        </Center>
                    </Box>
                )}
                
                {!this.state.isLoading && (
                    <>
                    
                    {this.showLeaderBoard}
                    
                    {(dataLeaderBoard.length === 0 || this.state.errorMessageLeader === "") && (
                       this.footerComponent(this.showLeaderBoard)
                    )}
                    </>
                )}

                
                <Box>
                    {this.state.isLoading ? (
                        <Box style={{position:"absolute", marginTop:"45vh", zIndex:"70", marginLeft:"42%"}}>
                            <Center>
                                <Loader timeout={3000}  type="Oval" color="#FA262F" height={60} width={60}/>
                            </Center>
                        </Box>
                    ):(
                    <>
                        <Center py="4">
                        
                        {this.state.errorMessage.length > 0 ?(
                            <Box>
                                <Text color={'#fff'} style={{fontWeight:"400", fontSize:"21px", marginTop:"16px"}}>{this.state.errorMessage}</Text>
                            </Box>
                        ):(
                            <HStack space={3} alignItems="center">
                                <img src={dataGameInfo.meta_img} width="88px" alt='banner game'
                                    height="88px" style={{marginLeft: window.innerWidth < 330 ? "1em" : window.innerWidth > 375? "0em": "0.5em", borderRadius: 7}} />
                                <Flex direction="column" style={{width: window.innerWidth < 330 ? "160px" : "210px"}}>
                                    <Text>
                                        <h1 className={Styles.competitionName} style={{ fontSize: 16, fontWeight: 600, margin:0}}>
                                            {dataGameInfo.name}
                                        </h1>
                                    </Text>
                                    <Box pb="2" >
                                        <Text className="competitionPublisher" fontSize={TextCustomStyle.fontSize} color={TextCustomStyle.color}>{dataGameInfo.publisher?dataGameInfo.publisher:"-"}</Text>
                                        <Text className="competitionEndDate" style={{ fontSize: 10, fontWeight: 'bold'}}>{moment(dataGameInfo.start_date).format("DD MMM")} - {moment(dataGameInfo.end_date).format("DD MMM YYYY")}</Text>
                                    </Box>
                                    <LinearGradient
                                        colors={['#434343', '#434343']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={[
                                            {
                                                flex: 1,
                                                justifyContent: 'center',
                                                borderRadius: 100,
                                                width:"130px"
                                            }
                                        ]}>
                                        <Flex direction="row">
                                            <Icon as={<Image source={{ uri: poin }} />} size="md" />
                                            <Flex direction="column">
                                                <Text className="competitionTotal" fontSize={"6px"} fontWeight={700} style={{ marginTop: "2px", marginLeft:"2px"}}>Total Reward</Text>
                                                <Text className="competitionTotalReward" fontSize={"14px"} fontWeight={700} style={{ marginLeft:"2px", marginBottom:"2px"}}>{this.state.totalReward}</Text>
                                            </Flex>
                                        </Flex>
                                    </LinearGradient>
                                </Flex>
                                <CopyToClipboard text={this.state.copyValue}
                                    onCopy={() => this.setState({copied: true, showAlert: true})}>
                                    <Icon as={<Image source={{ uri: share }} />} size="sm" style={{ alignSelf: 'flex-start' , marginRight:"16px"}} />
                                </CopyToClipboard>
                            </HStack>
                            )}
                        </Center>
                    
                        <CoolTabs
                            tabKey={"1"}
                            style={{ width:  "100%", height: statusPayment === "NOT_PAID_YET"? this.state.height+320 : this.state.height+160 }}
                            activeTabStyle={{ background:  "#171717", color:  "#FFFFFF", fontSize:"14", fontWeight:"700"}}
                            unActiveTabStyle={{ background:  "#171717", color:  "#FFFFFF", fontSize:"14", fontWeight:"400" }}
                            activeLeftTabBorderBottomStyle={{ background:  "#FA262F", height:  4, top: 44}}
                            activeRightTabBorderBottomStyle={{ background:  "#FA262F", height: 4, top: 44 }}
                            tabsBorderBottomStyle={{ background:  "#C4C4C4", height: 2, top: 45 }}
                            leftContentStyle={{ background: "#282828", top: 10 }}
                            rightContentStyle={{ background: "#282828", top: 10 }}
                            leftTabTitle={'Details'}
                            rightTabTitle={'Leaderboard'}
                            leftTabStyle={{height: "45px"}}
                            rightTabStyle={{height: "45px"}}
                            leftContent={<Details/>}
                            rightContent={dataGameInfo.show_leaderboard === 1 ? <Leaderboard/> : this.handleShowLeaderBoard()}
                            contentTransitionStyle={'transform 0.1s ease-in'}
                            borderTransitionStyle={'all 0.1s ease-in'}
                            onTabChanged={(key) => handleTabClick(key)}
                            />
                            

                        </>
                    )}
                </Box>
            </div>
            </>
        )
    }
}
