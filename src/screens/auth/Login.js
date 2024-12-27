import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Alert,
  Keyboard,
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, colors, fonts, signup_google, api2_get_profile, getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import {
  GoogleSignin,

} from '@react-native-google-signin/google-signin';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as AuthActions from '../../redux/actions/AuthActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { logo, mainlogo } from '../../assets/images/Images';
import { Fonts } from '../../assets/style';
import { responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker'
import LoginArrow from '../../svgicons/LoginArrow';
import FacebookIcon from '../../svgicons/FacebookIcon';
import GoogleIcon from '../../svgicons/GoogleIcon';
import OrIcon from '../../svgicons/OrIcon';
import GoogleButton from './components/GoogleButton';
const { width, height } = Dimensions.get('screen');

GoogleSignin.configure();

const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({ callingCode: '91', cca2: 'IN' });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const login = async () => {
    try {
      const phoneRegex = /^\d{10}$/
      if (phoneNumber.length == 0) {
        warnign_toast('Please Enter Mobile Number');
      } else if (!phoneRegex.test(phoneNumber)) {
        warnign_toast('Please Enter Correct Mobile Number');
      } else {
        props.dispatch(AuthActions.onLogin({ phoneNumber: phoneNumber, }))
      }
    } catch (e) {
      console.log(e)
    }
  };
  const [selected, setSelected] = React.useState('+91');
  const [country, setCountry] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyStatusBar
        backgroundColor={"#381415"}
        barStyle="light-content"
      />
      <MyLoader isVisible={isLoading} />

      <View style={styles.logoView}>
        <Text style={{
          ...Fonts.primaryRegular,
          color: "#fff",
          textDecorationLine: "underline",
          position: "absolute",
          top: 10,
          right: 10,
        }}>Skip</Text>
        <View>
          <Image source={require('../../assets/astrobookimages/logo.png')} style={styles.loginLogo} />
          <Text style={styles.loginImageText}>Your Astrology Search Ends Here</Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <CountryCodeDropdownPicker
          selected={selected}
          setSelected={setSelected}
          setCountryDetails={setCountry}
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          countryCodeTextStyles={{ fontSize: 14, color: "#000", }}
        // countryCodeContainerStyles	={{borderWidth:0,padding:0,paddingLeft:5}}
        // phoneStyles={{borderWidth:0,paddingHorizontal:0}}
        phoneStyles={{
          color: "#000", 
        }}
        />
        <TouchableOpacity style={styles.loginBtn}
          onPress={login}
        >
          <Text></Text>
          <Text style={styles.loginText}>GET OTP</Text>
          <LoginArrow />
        </TouchableOpacity>
        <Text style={styles.loginSignupText}>
          By Signing up, you agree to our <Text style={{ textDecorationLine: "underline" }}>Term of Use </Text>and <Text style={{ textDecorationLine: "underline" }}>Privacy Policy</Text>
        </Text>
        <View style={{ marginTop: 30, }}>
          <OrIcon width={SCREEN_WIDTH * 0.9} />

        </View>
 <GoogleButton />
          
      </View>




      {/* <View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 0,
              width: '85%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 25,
              marginBottom: 5,
              marginTop: 30
            }}>

            <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.4), fontWeight: 'bold', paddingRight: 5, paddingLeft: 10, color: "#fff", fontFamily: fonts.medium }}>
              {` +${code.callingCode}`}
            </Text>
            <View>
              <Text allowFontScaling={false} style={{ borderRightWidth: 1, borderColor: "#fff", height: getFontSize(1.8) }}></Text>
            </View>
            <TextInput
              placeholder="Enter Your Mobile Number"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              onChangeText={text => {

                if (text.length > 0 && text[0] === '0') {

                  setPhoneNumber(text.slice(1));
                } else {
                  setPhoneNumber(text);
                }

                if (text.length >= 10) {
                  Keyboard.dismiss();
                }
              }}
              style={{ width: '100%', fontSize: getFontSize(1.4), padding: 8, color: '#fff' }}
              maxLength={10}
              onTouchEndCapture={() => console.log('bye')}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => login()}
              cursorColor={colors.background_theme2}
              disableFullscreenUI={false}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={login}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 40,
            paddingVertical: 6,
            marginVertical: 10,
            borderRadius: 100,

          }}>
          <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.8), fontWeight: 'bold', color: "#F45F4B", }}>
            GET OTP
          </Text>
          <AntDesign
            name="rightcircle"
            color={"#F45F4B"}
            size={18}
          />
        </TouchableOpacity>

      </View> */}

    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
  logoView: {
    backgroundColor: colors.background_theme2,
    flex: 0.40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginLogo: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.4,
    objectFit: "contain",
  },
  loginImageText: {
    color: "#fff",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "700",
    fontSize: responsiveScreenFontSize(2.3),
    letterSpacing: 0.4,
  },
  inputView: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40,
    flex: 0.60,
    borderWidth:1
  },
  loginBtn: {
    backgroundColor: "#000000",
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(2.6),
    letterSpacing: 0.4,
  },
  loginSignupText: {
    color: "#000",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(1.9),
    marginTop: 15,
  },
  orImage: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    height: 15,
    objectFit: "contain",
    marginTop: 30,
  },
 
  googleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 10,
    marginTop: 30,
  }
});
