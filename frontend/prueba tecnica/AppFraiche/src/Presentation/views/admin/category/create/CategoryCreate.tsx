import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';


export const AdminCategoryCreateScreen = () => {

  const { name, description, image, onChange, responseMessage, errorMessage, setErrorMessage, takePhoto, pickImage, loading, createCategory } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage != '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }

  }, [responseMessage])

  //Implementacion de mensaje de error para esta pantalla --Edgar
  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('');

    }

  }, [errorMessage])


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}//Muestra para mostar opcion de camara o garelia
      >
        {
          image == ''
            ? <Image
              style={styles.image}
              source={require('../../../../../../assets/image_add.png')}
            />
            : <Image
              source={{ uri: image }}
              style={styles.image}
            />
        }

      </TouchableOpacity>

      <View style={styles.form}>

        <CustomTextInput
          placeholder='Nombre de la categoría '
          image={require('../../../../../../assets/image_add.png')}
          keyboardType='default'
          property='name'
          value={name}
          onChangeText={onChange}
        />

        <CustomTextInput
          placeholder='Descripción '
          image={require('../../../../../../assets/descriptionMS.png')}
          keyboardType='default'
          property='description'
          value={description}
          onChangeText={onChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text=' Crear Categoría'
          onPress={() => createCategory()}
          buttonStyle={{ backgroundColor: MyColors.admin }}
        />
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
          style={MyStyles.loading}
          size="large"
          color={MyColors.admin}
        />
      }

    </View>
  )
}

