import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import { showNumber } from '../../utils/services'
import * as AstromallActions from '../../redux/actions/astromallActions'
import { colors, getFontSize } from '../../config/Constants1'
import { api_url, base_url, img_url } from '../../config/constants'
import * as PoojaActions from '../../redux/actions/PoojaActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import Carousel from 'react-native-reanimated-carousel'
import * as HomeActions from '../../redux/actions/HomeActions'
import * as actionType from "../../redux/actionTypes"
import { useNavigation } from '@react-navigation/native'

const PoojaList = ({ route, dispatch, newPoojaData, customerData, categoryId }) => {
    console.log("klsjdahfuiorhd", categoryId)
    const navigation = useNavigation()
    useEffect(() => {
        dispatch(PoojaActions.getNewPoojaData({ categoryId: categoryId }))
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'dark-content'} />
            <View style={{}}>
                <MyHeader title={'Puja'} navigation={navigation} />


                {FilterSection()}
                <FlatList
                    style={{}}
                    ListHeaderComponent={<>
                       
                        {List()}
                    </>}
                />


            </View>
        </View>
    )





    function List() {
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('BookingPuja', { pujaData: item })}>
                <View style={{ display: "flex", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10, gap: 10 }}>
                    <View style={{ flex: 0.25, }}>
                        <View style={{ alignSelf: "center", backgroundColor: '#F4F4F4', height: 40, borderRadius: 60, width: 40, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#000", ...Fonts.primaryHelvetica, fontSize: 15 }}>{new Date(item?.createdAt).getDate()}</Text>
                        </View>
                        <Text style={{ color: "#000", ...Fonts.primaryHelvetica, fontSize: 13, textAlign: "center" }}>
                            {new Date(item?.createdAt).toLocaleString('en-US', { month: 'short' })}
                        </Text>
                        <Image source={require('../../assets/astrobookimages/line.png')}
                            style={{ objectFit: "contain", height: 90, alignSelf: "center" }}
                        />
                    </View>
                    <View style={{ flex: 0.75, borderWidth: 0.3, borderRadius: 10, borderColor: "#dadada" }}>
                        <ImageBackground
                            source={{ uri: img_url + item?.image }}
                            style={styles.poojaImage}
                            imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                        >
                            <View style={styles.overlay} />
                            <View style={{
                                backgroundColor: "#000", position: "absolute", paddingHorizontal: 10, paddingVertical: 3,
                                borderRadius: 10, left: 6, top: 3
                            }}>
                                <Text style={{ color: "#fff", fontSize: 7 }}>{item?.categoryId?.categoryName}</Text>
                            </View>
                            <Image source={require('../../assets/astrobookimages/astro.png')}
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                    position: "absolute",
                                    right: 5,
                                    top: 3,
                                }}
                            />

                            <View style={{ position: "absolute", bottom: 4, left: 5, }}>
                                <Text style={{ color: "#fff", ...Fonts.primaryHelvetica, fontSize: 12, }}

                                >{item?.pujaName?.split(" ").slice(0, 4).join(" ")}{item?.pujaName?.split(" ").length > 4 ? "..." : ""}</Text>
                                {item?.shortDescription && (
                                    <Text style={{ color: "#fff", ...Fonts.primaryHelvetica, fontSize: 13, }}>{item?.shortDescription}</Text>

                                )}
                            </View>
                        </ImageBackground>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5, paddingTop: 5, paddingBottom: 10, }}>
                            <Text style={styles.dateText}>Price: {"₹" + item?.price}</Text>
                            <View style={styles.cartBtn}
                                
                            >
                                <Text style={[styles.dateText, { color: "#fff" }]}>Add to Cart</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
        return (
            <>
                <FlatList
                    data={newPoojaData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </>
        )
    }
    function FilterSection() {
        return (
            <View>
                            <Text>Anuj</Text>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F3604C",
        paddingVertical: SCREEN_HEIGHT * 0.02,
        flexDirection: "row",
        paddingHorizontal: SCREEN_WIDTH * 0.06
    },
    dt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        borderBottomWidth: 1.9,
        borderBlockColor: "#D3D3D3",
        paddingRight: SCREEN_WIDTH * 0.03
    },
    button: {
        backgroundColor: "white",
        paddingHorizontal: SCREEN_WIDTH * 0.1,
        borderRadius: 100,
        paddingVertical: SCREEN_WIDTH * 0.016
    },
    list: {

    },
    banner: {
        marginBottom: 10,
        flexDirection: "row",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: 10
    },
    carouselItem: {
        // marginHorizontal: 10,
        // borderRadius: 10,
        // overflow: 'hidden', 
    },
    box: {
        paddingVertical: SCREEN_HEIGHT * 0.03,
        paddingHorizontal: SCREEN_WIDTH * 0.08,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#F3604C",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    btn: {
        backgroundColor: "white",
        paddingVertical: SCREEN_WIDTH * 0.016,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        borderRadius: 100
    },
    poojaImage: {
        width: "100%",
        height: 120,
        objectFit: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    sidepoojaImage: {
        width: 50,
        height: 90,
        objectFit: "contain",
        alignSelf: "center"
    },
    dateText: {
        ...Fonts.primaryHelvetica,
        color: "#000",
        fontSize: 10,
    },
    btnText: {
        ...Fonts.primaryHelvetica,
        color: "#fff",
        fontSize: 10,
        textAlign: "center"
    },
    cartBtn: {
        backgroundColor: '#F1B646',
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 9,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
})


const mapStateToProps = state => ({
    newPoojaData: state.pooja.newPoojaData,
    customerData: state.customer.customerData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PoojaList);

