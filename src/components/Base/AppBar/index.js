import back from '../../../assets/images/back.svg'
import {StatusBar, Box,Text, Image, IconButton, Icon, Center} from "native-base";
// import { useHistory } from "react-router-dom";

function AppBar(props){
    // const history = useHistory();
    const { title, onBackPress, noBackButton } = props;

    return (
        <>
            <StatusBar backgroundColor="#3A3A3A" barStyle="light-content" />

            <Box safeAreaTop backgroundColor="#3A3A3A" />

            <Box backgroundColor="#3A3A3A" paddingTop="16px" paddingBottom="16px">
                {!noBackButton &&(
                    <IconButton zIndex="55" onPress={onBackPress} style={{position:"absolute", left:"0px",top:"0px", marginTop:"10px", marginLeft:"8px"}} icon={<Icon as={<Image source={{ uri: back }} />} size="sm" color-="white" />} />
                )}
                <Center>
                    <Text color="white" fontSize="18" alignSelf="center" fontWeight='bold' textAlign="center">{title}</Text>
                </Center>
            </Box>
            {/* <HStack bg='#3A3A3A' px="1" py="2" width="100%">
                <HStack space="2"  width="100%">
                    
                </HStack>
            </HStack> */}

        </>
    )
}

export default AppBar;