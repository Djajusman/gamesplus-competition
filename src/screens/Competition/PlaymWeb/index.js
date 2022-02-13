import React from "react";
import { HStack, Text, Center, Box, Flex, Button } from "native-base";

function PlaymWeb() {
    
    return (
        <Box style={{background: "#000000", height: "100%", opacity :"0.9" }}>
            <Center py="4" style={{ paddingHorizontal: "13px", paddingTop: "159px" }}>
                <Box style={{ backgroundColor: '#282828', borderRadius: "7px", height: "162px", width: "95%", paddingVertical: "1px", marginBottom: "1px", marginLeft: "1px" }}>
                    <HStack space={2} style={{width: "100%", paddingRight:"100px"}} justifyContent="center">
                        <Flex direction="column">
                            <Flex style={{ marginLeft: "100px", marginBottom: "4px", marginTop: "32px" }}>
                                <Text color={'#fff'} style={{fontWeight: "normal", lineHeight: "22px", textAlign: "center", letterSpacing: "0.64px", fontSize: "16px" }}>This games can only</Text>
                                <Text color={'#fff'} style={{fontWeight: "normal", lineHeight: "22px", textAlign: "center", letterSpacing: "0.64px", fontSize: "16px" }}>open & play in Vision+ Apps.</Text>
                                <Button onPress={() => window.location.href='https://play.google.com/store/apps/details?id=com.zte.iptvclient.android.idmnc'} style={{ width: "250px", height: "36px", background: "#FA262F", borderRadius: "7px", marginVertical: "20px" }}>
                                    <Center>
                                        <Flex direction="row" style={{ alignItems: "center" }}>
                                            <Text color={'#fff'} style={{ fontWeight: "600px", fontSize: "14px", lineHeight:"19px", letterSpacing:"0.56px",  }}>Open or Download Vision+</Text>
                                        </Flex>
                                    </Center>
                                </Button>
                            </Flex>
                        </Flex>
                    </HStack>
                </Box>
            </Center>
        </Box>
    )
}

export default PlaymWeb