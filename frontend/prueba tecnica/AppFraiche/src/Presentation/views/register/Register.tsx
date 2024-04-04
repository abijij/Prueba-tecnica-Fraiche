import React, { useEffect, useState } from 'react'
import { Image, ActivityIndicator, View, Text, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import { MyColors } from '../../theme/AppTheme';
import { ModalPickImageClient } from '../../components/ModalPickImageClient';
import { BackgroundAnimation } from '../../../Presentation/components/BackgroundAnimation';

//Edgar c:

// Declaramos las propiedades de navegación que recibirá el componente
interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

// Componente funcional de la pantalla de registro
export const RegisterScreen = ({ navigation, route }: Props) => {
  console.log('El usuario ha ingresado a la pantalla Register');


  // Uso del hook useViewModel
  const { name, lastname, email, image, phone, password, confirmPassword, loading, errorMessage, user, flaggy, canContinue, flaggySetting, setflaggy, setErrorMessage, onChange, register, pickImage, takePhoto } = useViewModel();

  // useEffect para mostrar errores en un ToastAndroid
  const [modalVisible, setModalVisible] = useState(false);

  console.log('Flaggy:  ' + flaggy)
  const handlePress = () => {
    flaggySetting();
    register();
  }

  const navigateToVerifyScreen = async () => {
    navigation.navigate('VerifyScreen');
  };


  // useEffect para redirecciónar al usuario a la pantalla de ClientTabsNavigator cuando se registre
  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('');
    }
  }, [errorMessage])

  useEffect(() => {
    if (flaggy) {
      navigateToVerifyScreen();
      setflaggy(false);
    }
  }, [flaggy])

  //  // Redirigimos al usuario a la pantalla de inicio si ya inició sesión
  // useEffect(() => {      
  //   if (user?.id !== null && user?.id !== undefined) {
  //       navigation.replace('VerifyScreen');
  //   }
  // }, [user])

  // Renderizado del componente RegisterScreen
  return (
    // COLUMN
    // Columna principal
    <View style={styles.container}>

     <BackgroundAnimation/>
      
      {/*Contenedor de imagen de perfil*/}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {
            image == ''
              ? <Image
                source={require('../../../../assets/user_image.png')}
                style={styles.logoImage}
              />
              : <Image
                source={{ uri: image }}
                style={styles.logoImage}
              />
          }

        </TouchableOpacity>

        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>
      {/*Contenedor de imagen de formulario de registro*/}
      <View style={styles.form}>

        <ScrollView>

          <Text style={styles.formText}>REGISTRARSE</Text>

          {/*Contenedor de formulario de nombre*/}
          <CustomTextInput
            placeholder='Nombre/s'
            keyboardType='default'
            image={require('../../../../assets/user.png')}
            property='name'
            onChangeText={onChange}
            value={name}
          />

          {/*Contenedor de formulario de Apelliddos*/}
          <CustomTextInput
            placeholder='Apellidos'
            keyboardType='default'
            image={require('../../../../assets/my_user.png')}
            property='lastname'
            onChangeText={onChange}
            value={lastname}
          />

          {/*Contenedor de formulario de correo*/}
          <CustomTextInput
            placeholder='Correo electrónico'
            keyboardType='email-address'
            image={require('../../../../assets/emailMS.png')}
            property='email'
            onChangeText={onChange}
            value={email}
          />

          {/*Contenedor de formulario de correo*/}
          <CustomTextInput
            placeholder='Teléfono'
            keyboardType='numeric'
            image={require('../../../../assets/phone.png')}
            property='phone'
            onChangeText={onChange}
            value={phone}
          />

          {/*Contenedor de formulario de contraseña */}
          <CustomTextInput
            placeholder='Contraseña'
            keyboardType='default'
            image={require('../../../../assets/password.png')}
            property='password'
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />

          {/*Contenedor de formulario de contraseña*/}
          <CustomTextInput
            placeholder='Confirmar Contraseña'
            keyboardType='default'
            image={require('../../../../assets/confirm_password.png')}
            property='confirmPassword'
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />

        </ScrollView>
        <View style={{ marginTop: 30 }}>

          <RoundedButton text='CONFIRMAR' onPress={handlePress} />

        </View>
      </View>


      <ModalPickImageClient
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {
        loading &&
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={MyColors.client}
        />
      }


    </View>
  );
}

// HOT RELOAD



