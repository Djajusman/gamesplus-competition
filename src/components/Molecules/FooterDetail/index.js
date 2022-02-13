import { Center, Text, Flex, Box, Image, Button} from "native-base"
import clock from '../../../assets/images/clock.svg'
import information from '../../../assets/images/information-sign.svg'
import CardLeaderBoard from "../CardLeaderBoard";
import { useHistory } from "react-router-dom";

function FooterDetail(props){
    const { pushTo, price, timeEnd, mode, size} = props;
    const history = useHistory();

    const heightMode = size === "large"? "110px": "110px"
    const bgButton = mode === "blue"? "linear-gradient(130.47deg, #37A8DA 5.6%, #00628B 93.94%)":"#FA262F"
    return(
        <>
 
            <Box style={{background:"linear-gradient(180deg, rgba(40, 40, 40, 0.0001) 0%, rgba(40, 40, 40, 0.6) 17.58%, rgba(40, 40, 40, 0.87) 42.41%, #282828 100%)", height:heightMode, width:"100%", paddingVertical:size === "large"?"28px":"8px"}}>
                
                
                <Center>
                    {size === "large"?(
                         <>
                         </>
                    ):(
                       
                        <Flex direction="row" style={{padding: "8px", alignItems:"center"}}>
                            <Image source={{ uri: information }}style={{ width: "10px", height:"10px", marginRight:"2px"}}/>
                            <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"10px"}}>Pay once for play many times!</Text>
                        </Flex>
                    )}
                    
                    <Button onPress={() => history.push(pushTo)} style={{width:"250px", height:"36px", background:bgButton, borderRadius:"7px", marginVertical:"8px"}}>
                        <Center>
                            <Flex direction="row" style={{alignItems:"center"}}>
                                <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>{mode == "blue"?"Play":"Play - "}</Text>
                                <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"14px"}}>{price}</Text>
                            </Flex>
                        </Center>
                    </Button>
                    <Flex direction="row" style={{paddingHorizontal: "8px", alignItems:"center"}}>
                        <Image source={{ uri: clock }}style={{ width: "10px", height:"10px", marginRight:"4px"}}/>
                        <Text color={'#fff'} style={{fontWeight:"normal", fontSize:"10px"}}>Will End in</Text>
                        <Text color={'#fff'} style={{fontWeight:"bold", fontSize:"10px", marginLeft:"4px"}}>{timeEnd}</Text>
                    </Flex>
                </Center>
            </Box> 
        </>
    )
}

export default FooterDetail;