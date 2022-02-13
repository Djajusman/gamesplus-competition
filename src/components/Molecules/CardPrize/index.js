import React, { Component } from "react";
import { Text, Image } from "native-base"

import poin from '../../../assets/images/poin.svg'

class CardPrize extends Component {

    formatRupiah = (angka)=>{
        var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp'+ribuan;
    }

    render() {
        const { dataPrize } = this.props;
        return (
            <>
                <table style={{ borderCollapse: "collapse", border: "none" }} rules="none" border="none" cellPadding="0" cellSpacing="0" >
                    <tbody>
                        <tr style={{ border: "none" }}>
                            <td style={{ border: "none", paddingLeft: "1.5000em", width: "72.5%" }}>
                                <Text className="detailPrize" style={{ fontSize: "12px", fontWeight: "600" }}>Ranks</Text>
                            </td>
                            <td style={{ border: "none", width: "27.5%", paddingLeft:"5px", paddingRight:"3.000em" }}>
                                <Text className="detailPrize" style={{ fontSize: "12px", fontWeight: "600" }}>Rewards</Text>
                            </td>
                        </tr>
                        {dataPrize.map((item, index) =>
                            <tr key={index} style={{ backgroundColor: (index % 2 === 0) ? '#3A3A3A' : '#282828', height: "24px", width: "100%", border: "none" }}>
                                <td style={{ border: "none", borderTopLeftRadius: "7px", borderBottomLeftRadius: "7px", paddingLeft: "1.5000em" }}>
                                    <Text className="detailPrize" style={{ fontWeight: "bold", fontSize: "12px" }}>{item.ranks}</Text>
                                </td>
                                <td style={{ border: "none", borderTopRightRadius: "7px", borderBottomRightRadius: "7px" }}>
                                    <table style={{margin:"0px",padding:"0px"}}>
                                        <tbody style={{margin:"0px",padding:"0px"}}>
                                            <tr style={{ border: "none" }}>
                                                <td style={{ border: "none" }}>
                                                    <Image source={{ uri: poin }} style={{ width: "16px", height: "16px" }} />
                                                </td>
                                                <td style={{ border: "none" }}>
                                                    <Text className="detailPrize" style={{ fontSize: "12px" }}>{this.formatRupiah(item.reward)}</Text>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}

export default CardPrize