import React from 'react';
import { Center, Text, Flex, Box, Image, Button} from "native-base"
import clock from '../../../assets/images/clock.svg'
import information from '../../../assets/images/information-sign.svg'
import CardLeaderBoard from "../CardLeaderBoard";
import Countdown from "react-countdown";

function Footer(props){
    const { onPressButton, price, timeEnd, mode, size, platform, positionRank, positionPrems, nameRank, idGameRank, pointGameRank, lastPlayRank, emitter} = props;

    const heightMode = size === "large"? "158px": "110px"
    const bgButton = mode === "blue"? "linear-gradient(130.47deg, #37A8DA 5.6%, #00628B 93.94%)":"#FA262F"
    const[ showLeaderBoard, setShowRank ] = React.useState(false);
    const renderer = ({ days, hours, minutes, completed }) => {
        if (completed) {
          return <span>0d 0h 0m</span>;
        } else {
          return (
            <span>
              {days}d {hours}h {minutes}m
            </span>
          );
        }
      };
      const timeAgo = (prevDate) => {
        const diff = Number(new Date()) - prevDate;
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        // const year = day * 365;
        switch (true) {
            case diff < day:
                return Math.round(diff / hour) + 'h ago';
            case diff < month:
                return Math.round(diff / day) +'d '+ Math.round(diff / hour) + 'h ago';
            // case diff < year:
            //     return Math.round(diff / month) + ' months ago';
            // case diff > year:
            //     return Math.round(diff / year) + ' years ago';
            default:
                return "";
            }
    };
    emitter.on('show-rank', (args) => setShowRank(args))
    return(
        <>
 
            <Box style={{background:"linear-gradient(180deg, rgba(40, 40, 40, 0.0001) 0%, rgba(40, 40, 40, 0.6) 17.58%, rgba(40, 40, 40, 0.87) 42.41%, #282828 100%)", height:heightMode, width:"100%", paddingVertical:size === "large"?"28px":"8px"}}>
                
                {size === "large" && showLeaderBoard?(
                    <div style={{marginRight:"8px",marginLeft:"8px", marginBottom:"6px"}}>
                        <CardLeaderBoard
                            name = {nameRank}
                            idGame = {idGameRank}
                            pointGame = {pointGameRank}
                            lastPlay = {timeAgo(new Date(lastPlayRank).getTime())}
                            mode = {size === "large"?"white":""}
                            platform = {platform}
                            position = {positionRank}
                            positionPrems = {positionPrems}
                        />
                    </div>
                ):(
                    <>
                        <div style={{paddingTop:size === "large"?"56px":""}}>
                        </div>
                    </>
                )}
                
                <Center>
                    {size === "large"?(
                         <>
                         </>
                    ):(
                       
                        <Flex direction="row" style={{padding: "4px", alignItems:"center", paddingTop:"11px",paddingButtom:"56px"}}>
                            <Image source={{ uri: information }}style={{ width: "10px", height:"10px", marginRight:"2px", marginBottom:"1px"}}/>
                            <Text className="footer" style={{fontWeight:"bold", fontSize:"10px"}}>Pay once for play many times!</Text>
                        </Flex>
                    )}
                    
                    <Button onPress={onPressButton} style={{width:"250px", height:"36px", background:bgButton, borderRadius:"7px"}}>
                        <Center>
                            <Flex direction="row" style={{alignItems:"center"}}>
                                <Text className="footerButton" style={{fontWeight:"bold"}}>{mode === "blue"?"Play":"Play - "}</Text>
                                <Text className="footerButton" style={{fontWeight:"bold"}}>{mode === "blue"? "" : price}</Text>
                            </Flex>
                        </Center>
                    </Button>
                    <Flex direction="row" style={{paddingTop: "8px", alignItems:"center"}}>
                        <Image source={{ uri: clock }}style={{ width: "10px", height:"10px", marginRight:"6px", marginBottom:"1px"}}/>
                        <Text className="footer" style={{fontSize:"10px"}}>Will end in</Text>
                        <Text className="footer" style={{fontWeight:"bold", fontSize:"12px", marginLeft:"4px"}}>
                            <Countdown
                                date={new Date(timeEnd) + 10000}
                                renderer={renderer}
                            />
                        </Text>
                    </Flex>
                </Center>
            </Box> 
        </>
    )
}

export default Footer;