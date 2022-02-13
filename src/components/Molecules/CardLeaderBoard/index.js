import {Text, HStack, Flex, Box, Image} from "native-base"

import flag from '../../../assets/images/flagId.svg'
import point from '../../../assets/images/point.svg'
import pointSmall from '../../../assets/images/pointSmall.svg'
import androidWhite from '../../../assets/images/androidWhite.svg'
import appleWhite from '../../../assets/images/appleWhite.svg'
import desktopWhite from '../../../assets/images/desktopWhite.svg'
import phoneWhite from '../../../assets/images/phoneWhite.svg'
import androidDark from '../../../assets/images/androidDark.svg'
import appleDark from '../../../assets/images/appleDark.svg'
import desktopDark from '../../../assets/images/desktopDark.svg'
import phoneDark from '../../../assets/images/phoneDark.svg'
import flagCard from '../../../assets/images/flagCardLeaderBoard.svg'
import flagCardSmall from '../../../assets/images/flagCardLeaderSmall.svg'

function CardLeaderBoard(props){
    const { name, idGame,pointGame, lastPlay, mode, position, positionPrems, platform } = props;

    return (
        <>
            <Box>
                <Flex direction="row">
                    <Box style={{backgroundColor: mode === "white" ? "#FFFFFF" : "#8F8F8F", borderRadius:"8px", height:mode === "white" ? "42px" : "64px", width:mode === "white" ? "97%" : "95%", paddingVertical: mode === "white" ? "3px":"10px", marginBottom:mode === "white" ? "4px":"9px", marginLeft:mode === "white"?"2%":"3%", marginTop:"4px"}}>
                        <HStack space={2} alignItems="center">
                            <Flex direction="column">
                                {mode === "white" ?(
                                    <>
                                        <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"36px", fontWeight:"normal", fontSize:"12px"}}>Your Rank</Text>
                                        <Flex direction="row" style={{marginLeft:"34px"}}>
                                            <Image source={{ uri: flag }}style={{ width: "12px", height:"8px", marginTop:"4px"}}/>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"8px", fontWeight:"normal", fontSize:"12px"}}>{name} - </Text>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"4px", fontWeight:"normal", fontSize:"12px"}}>ID {idGame}</Text>
                                            <Image source={{ uri: platform === "android" ? androidDark : platform === "ios"? appleDark : platform === "webd"? desktopDark:phoneDark}}style={{ width: "10px", height:"12px", marginLeft:"6px", marginTop:"2px"}}/>
                                        </Flex>
                                    </>
                                ):(
                                    <>
                                        <Flex direction="row" style={{marginLeft:"31px", marginBottom:"4px"}}>
                                            <Image source={{ uri: flag }}style={{ width: "12px", height:"8px", marginTop:"4px"}}/>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"4px", fontWeight:"600", fontSize:"12px"}}>{name} - </Text>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"4px", fontWeight:"400", fontSize:"12px"}}>ID {idGame}</Text>
                                            <Image color="#fff" source={{ uri: platform === "android" ? androidWhite : platform === "ios"? appleWhite: platform === "webd"? desktopWhite:phoneWhite}}style={{ width: "10px", height:"12px", marginLeft:"6px", marginTop:"2px"}}/>
                                        </Flex>

                                        <Flex direction="row" style={{marginLeft:"20px"}}>
                                            <Image source={{ uri: mode === "white" ? pointSmall : point }}style={{ width: "16px", height:"16px", marginTop:"4px"}}/>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"4px", fontWeight:"700", fontSize:"16px"}}>{pointGame}</Text>
                                        </Flex>
                                    </>
                                )}
                            </Flex>
                            {mode === "white" ?(
                                <>
                                    <Flex direction="column" alignItems="right" style={{position: 'absolute',right: 0, marginRight:"8px"}}>
                                        <Flex direction="row" style={{marginLeft:"18px", alignContent:"center"}}>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"8px", fontWeight:"400", fontSize:"10px", right:"0px"}}>Last play</Text>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"8px", fontWeight:"600", fontSize:"10px", textAlign:"right"}}>{lastPlay}</Text>
                                        </Flex>
                                        <Flex direction="row" style={{marginLeft:"18px"}}>
                                            <Image source={{ uri: mode === "white" ? pointSmall : point }}style={{ width: "16px", height:"16px", marginTop:"3px"}}/>
                                            <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"6px", fontWeight:"bold", fontSize:"14px"}}>{pointGame}</Text>
                                        </Flex>
                                    </Flex>
                                </>
                            ):(
                                <Flex direction="column" alignItems="right" style={{position: 'absolute',right: 0, marginRight:"8px", marginTop:"8px"}}>
                                    <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"8px", fontWeight:"normal", fontSize:"12px", right:"0px"}}>Last play</Text>
                                    <Text color={mode === "white"?"#282828" : "#fff"} style={{marginLeft:"8px", fontWeight:"bold", fontSize:"12px", textAlign:"right"}}>{lastPlay}</Text>
                                </Flex>
                            )}
                        
                        </HStack>
                    </Box>
                    <Flex direction="row" style={{position:"absolute",flex:"2", zIndex:"9" , marginVertical:mode === "white" ? "8px" : "6px", marginLeft:"6px"}}>
                        <Text color="#FFF" style={{fontSize:"18px", fontStyle:"italic", fontWeight:"700"}}>{position}</Text>
                        <Text color="#FFF" style={{fontSize:"8px", fontStyle:"italic", fontWeight:"700", marginLeft:"2px", marginTop:"2px"}}>{positionPrems}</Text>
                    </Flex>
                    <Image source={{ uri: mode === "white" ? flagCardSmall : flagCard }}style={{ width: mode === "white" ? "42px" : "44px", height:mode === "white" ? "34px" : "42px",marginTop: mode === "white" ? "8px" : "0px", position: "absolute", flex:"2"}}></Image>
                </Flex>
            </Box>
        </>
    )
}

export default CardLeaderBoard;