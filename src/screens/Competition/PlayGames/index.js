import React, { Component } from "react";
import {Box} from "native-base";
import Iframe from 'react-iframe'
import AppBar from "../../../components/Base/AppBar";
import { getGameInfo } from "../../../api";

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGame: [],
            dataUrlGamesAndro:"",
            token:localStorage.getItem('token'),
            idCompetition:parseInt(localStorage.getItem('id')),
            deviceType: localStorage.getItem('deviceType'),
            statusPayment: localStorage.getItem('statusPayment'),
            userId: localStorage.getItem('userId')
        };
    }

    componentDidMount() {
        // this.getDataLocalStorage()
        this.getGamesInfo()
    }

    getDataLocalStorage = () => {
        const dataToken = localStorage.getItem('token')
        const idGame = localStorage.getItem('id')
        this.setState({
            token: dataToken,
            idCompetition: parseInt(idGame)
        })
    }

    getGamesInfo = () => {
        const {token, idCompetition, deviceType} = this.state
        getGameInfo(idCompetition, token).then((res) => {

            const dataUrlAndroid = res.data && res.data.data && res.data.data.game_url_android
            const dataUrlIos = res.data && res.data.data && res.data.data.game_url_ios
            const gameId = res.data && res.data.data && res.data.data.game_id

            const removeBracketAndro = dataUrlAndroid.replace('[TOKEN]', `${token}&gid=${gameId}&cid=${idCompetition}&plat=${deviceType}`)
            const removeBracketIos = dataUrlIos.replace('[TOKEN]', `${token}&gid=${gameId}&cid=${idCompetition}&plat=${deviceType}`)
            const result = deviceType === "android" ? removeBracketAndro : removeBracketIos

            this.setState({
                dataUrlGamesAndro: result,
                dataGame: res.data && res.data.data && res.data.data
            })
        })
        .catch((err) => {
            throw err;
        });
    }

    handleBackPress =()=> {
        const {
            history: { replace }
        } = this.props;

        replace(`competition/${localStorage.getItem('id')}/${localStorage.getItem('param')}`)
    }
    
    render() {
        const { dataGame } = this.state
        return (
            <>
                {dataGame.available_webm === 0 ? (
                    <>
                        {this.props.history.push('/play-mweb')}
                    </>
                ) : (
                    <Box style={{ background: "#000000", height: "100vh" }}>
                        <AppBar title={dataGame.name} onBackPress={() => this.handleBackPress()} />
                        <Iframe url={this.state.dataUrlGamesAndro}
                            display= "block"
                            bgcolor="#FFFFFF "
                            frameBorder="0"
                            width="100%"
                            id={dataGame.competition_id}
                            // className="games"
                            height= {`${window.innerHeight - 59} "px"`}
                            styles={{ height: "0px", marginLeft:"0", marginRight:"0px"}} />
                    </Box>
                )}
            </>
        )
    };
}