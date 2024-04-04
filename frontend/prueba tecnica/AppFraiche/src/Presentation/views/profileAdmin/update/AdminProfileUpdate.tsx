import React, { useEffect, useState } from 'react'
import { Image, ActivityIndicator, View, Text, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { RoundedButton } from '../../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';
import { ModalPickImage } from '../../../components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { MyColors } from '../../../theme/AppTheme';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';


//Esta pantalla se implementó para poder separar el perfil del cliente con el del
//administrador, de manera que se pueda cambiar el diseño de ambos roles-- Edgar


//Nota para actualizar la contrase;a seria actualizar cerrar sesion y de nuevo logearte con la nueva contraseña
// Declaramos las propiedades de navegación que recibirá el componente
interface Props extends StackScreenProps<RootStackParamList, 'AdminProfileUpdateScreen'> { };


//route: Funciona para obtener informacion que me envian otras pantallas
// Componente funcional de la pantalla de registro
export const AdminProfileUpdateScreen = ({ navigation, route }: Props) => {


  const { user } = route.params;
  // Uso del hook useViewModel
  const { name, lastname, image, phone, loading, errorMessage, setErrorMessage, onChange, update, pickImage, successMessage, takePhoto, onChangeInfUpdate } = useViewModel(user);

  // useEffect para mostrar errores en un ToastAndroid
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect para redirecciónar al usuario a la pantalla de ClientTabsNavigator cuando se registre
  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('');

    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage != '') {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
    }
  }, [successMessage])

  // Renderizado del componente RegisterScreen
  return (
    // COLUMN
    // Columna principal
    <View style={styles.container}>

      {/* Imagen de fondo*/}
      <Image
        source={require('../../../../../assets/FondoAppFraiche.jpg')}
        style={styles.imageBackground}
      />
      {/*Contenedor de imagen de perfil*/}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {
            image == ''
              ? <Image
                source={{ uri: user?.image }}
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

        <Text style={styles.formText}>Actualizar</Text>

        {/*Contenedor de formulario de nombre*/}
        <CustomTextInput
          placeholder='Nombres'
          keyboardType='default'
          image={require('../../../../../assets/userMS.png')}
          property='name'
          onChangeText={onChange}
          value={name}
        />

        {/*Contenedor de formulario de Apelliddos*/}
        <CustomTextInput
          placeholder='Apellidos'
          keyboardType='default'
          image={require('../../../../../assets/my_userMS.png')}
          property='lastname'
          onChangeText={onChange}
          value={lastname}
        />

        {/*Contenedor de formulario de correo*/}
        <CustomTextInput
          placeholder='Teléfono'
          keyboardType='numeric'
          image={require('../../../../../assets/phoneMS.png')}
          property='phone'
          onChangeText={onChange}
          value={phone}
        />

        <View style={{ marginTop: 30 }}>

          <RoundedButton
            text='CONFIRMAR'
            onPress={() => update()}
            buttonStyle={{ backgroundColor: MyColors.admin }}

          />

        </View>
      </View>


      <ModalPickImage
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
          color={MyColors.admin}
        />
      }

    </View>
  );
}

// HOT RELOAD



