import React, { useState, useEffect, useRef, useContext } from 'react';
import { Image, View, Text, TextInput, ToastAndroid, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import VerifyStyles from './Styles';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { UserContext } from '../../context/UserContext';
import useViewModel from './ViewModel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


interface Props extends StackScreenProps<RootStackParamList, 'VerifyScreen'> { }

export const VerifyScreen = ({ navigation, route }: Props) => {

  const [code, setCode] = useState('');
  const [verificationId, setVerificationId]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = React.useState<string | null>(null);
  const formattedVerificationId = verificationId ?? '';
  const recaptchaVerifier: any = React.useRef(null);
  const { UpdateVerifyStatus } = useViewModel();
  const { getUserSession, user, flaggy, saveUserSession, removeUserSession, setFlaggyTrue } = useContext(UserContext);
  let defaultCountryCode = '';
  const [phonenumber, setPhonenumber] = useState('');

  useEffect(() => {
    if (user?.phone === null || user?.phone === undefined) {
      getUser();
    }
    else if (user?.phone !== null || user?.phone !== undefined) {
      defaultCountryCode = '+52 ' + user?.phone;
      setPhonenumber(defaultCountryCode);
    }
  }, [user?.phone]);

  const doIt = () => {
    sendVerificcation();
  };

  const getUser = () => {
    getUserSession();
  };

  const update = () => {
    UpdateVerifyStatus(user?.id!);
    setFlaggyTrue();
    navigateToHomeScreen();
  };

  const navigateToHomeScreen = async () => {
    navigation.navigate('HomeScreen');
  };

  const sendVerificcation = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phonenumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      formattedVerificationId,
      code
    );
    firebase.auth().signInWithCredential(credential)
      .then(() => {
        setCode('');
        UpdateVerifyStatus(user?.id!);
        setFlaggyTrue();
        ToastAndroid.show("Verificación exitosa", ToastAndroid.LONG);
        navigateToHomeScreen();
      })
      .catch((error) => {
        ToastAndroid.show("Código incorrecto", ToastAndroid.LONG);
      });
  };

  return (
    <View style={VerifyStyles.container}>
      <Image
        source={require('../../../../assets/FondoAppFraiche.jpg')}
        style={StyleSheet.absoluteFillObject}
      />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <View style={VerifyStyles.form}>
        <KeyboardAwareScrollView>
          <View style={VerifyStyles.imageContainer}>
            <Image
              source={require('../../../../assets/codeSMS.png')}
              style={VerifyStyles.image}
            />
          </View>
          <TextInput
            defaultValue={phonenumber}
            placeholder='Ingresa tu teléfono con código de país'
            onChangeText={setPhonenumber}
            keyboardType='phone-pad'
            autoComplete='tel'
            style={VerifyStyles.textInput}
          />
          <TouchableOpacity style={VerifyStyles.sendVerification} onPress={doIt}>
            <Text style={VerifyStyles.buttonText}>
              Enviar código de verificación
            </Text>
          </TouchableOpacity>

          <View style={VerifyStyles.imageContainer}>
            <Image
              source={require('../../../../assets/codeConf.png')}
              style={VerifyStyles.image}
            />
          </View>

          <TextInput
            placeholder='Ingresa el código proporcionado'
            onChangeText={setCode}
            keyboardType='number-pad'
            style={VerifyStyles.textInput}
          />
          <TouchableOpacity style={VerifyStyles.sendCode} onPress={confirmCode}>
            <Text style={VerifyStyles.buttonText}>
              Confirmar código de verificación
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
