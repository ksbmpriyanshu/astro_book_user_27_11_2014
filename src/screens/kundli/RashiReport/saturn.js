import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {useEffect} from 'react';
  import {api_astrolist1, api_url, colors, fonts,get_HouseReport,get_RashiReport,get_panchang} from '../../../config/Constants';
  import {StyleSheet} from 'react-native';
  import {useState} from 'react';
  import axios from 'axios';
  import MyLoader from '../../../components/MyLoader';
  import moment from 'moment';
  
  const {width, height} = Dimensions.get('screen');
  
  const SaturnRashi = props => {
    console.log('pppp',props?.route?.params?.data);

    

    const [isLoading, setIsLoading] = useState(false);
    const [pachang, setPachang] = useState(null);
    useEffect(() => {
      props.navigation.setOptions({
        tabBarLabel: 'saturn',
      });
    }, []);
  
    useEffect(() => {
      get_astrologer();
    }, []);

  
    const get_astrologer = async () => {
        setIsLoading(true);
        await axios({
            method: 'post',
            url: api_url + get_RashiReport,
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            data: {
                kundli_id:props?.route?.params?.data?.kundali_id,
                sub:'saturn'
            },
          }).then((res)=>{
            console.log(res.data);
            if(res.data != null)
            {
                setIsLoading(false);
                setPachang(res.data.planets);
               
            }     
            
          }).catch(err=>{
            setIsLoading(false);
            console.log('aaa',err)
          });
    };
  
    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        {/* <MyLoader isVisible={isLoading} /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 0,
              width: '95%',
              alignSelf: 'center',
              backgroundColor: '#fafdf6',
              marginVertical: 10,
              borderRadius: 15,
              shadowColor: colors.black_color5,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation:6
            }}>
                {pachang && (
                <View style={styles.itemContainer}>
                    <Text allowFontScaling={false} style={styles.itemText}>{pachang.planet}</Text>
                    <View>
                    <Text allowFontScaling={false} style={{ color: 'black', padding: 10, fontSize: 16, textAlign: 'justify' }}>
                        {pachang.rashi_report}
                    </Text>
                    </View>
                </View>
                )}
            
           
            
          </View>
          
        </ScrollView>
      </View>
    );
  };
  
  export default SaturnRashi;
  
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      
      alignItems: 'center',
      padding: 15,
      alignSelf:'center'
    },
    itemText: {
      
      fontSize: 22,
      color: 'red',
      fontFamily: fonts.medium,
      fontWeight:'bold',
      textAlign:'center'
    },
  });
  