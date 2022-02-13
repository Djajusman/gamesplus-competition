import React, { Component } from 'react';
import { Center, Text, Flex, Image} from "native-base"

import CardLeaderBoard from "../../../../components/Molecules/CardLeaderBoard"
import { getLeaderBoards } from "../../../../api";
import imageError from '../../../../assets/images/error.svg'
import moment from 'moment';

export default class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLeaderboard:[],
            dataLeader:[],
            statusPayment:"NOT_PAID_YET",
            total:"",
            errorMessage: "",
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id'))
        }
    }

    componentDidMount() {
        // this.getDataLocalStorage()
        this.getDataLeaderboard()
    }

    getDataLocalStorage = () => {
        const dataToken = localStorage.getItem('token')
        const idGame = localStorage.getItem('id')
        this.setState({
            token: dataToken,
            idCompetition: parseInt(idGame)
        })
    }

    getDataLeaderboard = () => {
        const {token, idCompetition} = this.state
        getLeaderBoards(idCompetition, token).then((response) => {
            if(response === undefined){
                this.setState({
                    errorMessage: "data tidak ditemukan"
                })
            }else if(response.data && response.data.status && response.data.status.code > 0) {
                this.setState({
                    errorMessage: response.data && response.data.status && response.data.status.message_client
                })
            } else {
                localStorage.setItem('gamePrice', response.data && response.data.data && response.data.data.entry_fee)
                this.setState({
                    dataLeaderboard: response.data && response.data.data && response.data.data.leaderboards,
                    dataLeader: response.data && response.data.data && response.data.data,
                    total: this.formatRupiah(response.data && response.data.data && response.data.data && response.data.data.entry_fee)
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

    handleButtonPress = () => {
        const {
            history: { replace }
          } = this.props;
        
        replace('/motion-pay')
    }

    render() {
        const {dataLeaderboard, dataLeader} =  this.state
        var rows = [], i = 0, len = 10;
        while (++i <= len) rows.push(i);

        return (
            <>
                <Center>
                    <Flex direction="row" style={{padding: "8px", alignItems:"center"}}>
                        <Text className="leaderboardLastupdateText" style={{fontWeight:"400", fontSize:"8px"}}>Last Update</Text>
                        <Text className="leaderboardLastupdateText" style={{marginLeft:"4px", fontWeight:"700", fontSize:"8px"}}>{moment(dataLeader.last_updated).format("DD-MM-YYYY, h:mm")}</Text>
                    </Flex>
                </Center>
                <div bg="#282828" style={{marginLeft:"20px", marginRight:"20px", zIndex:"20"}}>
                    
                    {dataLeaderboard.length > 0 ? dataLeaderboard.map((item, index) =>
                        <CardLeaderBoard
                            key={index}
                            position = {item.rank}
                            positionPrems = {this.formatOrdinal(item.rank)}
                            name = {item.display_name}
                            idGame = {item.user_id}
                            pointGame = {this.formatRibuan(item.score)}
                            lastPlay = {item.last_played}
                            platform = {item.src_platform}
                        />
                    ): (
                        <>
                            <Center>
                                <Image source={imageError} style={{ width:"144px", height:"137px", marginTop:"40px" }}/>
                                <Text color={'#fff'} style={{fontWeight:"400", fontSize:"21px", marginTop:"16px"}}>{this.state.errorMessage}</Text>
                            </Center>
                        </>
                    )}
                    
                </div>    
            </>
        );
    }
}
