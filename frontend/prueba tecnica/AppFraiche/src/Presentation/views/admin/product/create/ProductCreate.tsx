import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { ModalPickMultipleImage } from '../../../../components/ModalPickMultipleImage';
import { ScrollView } from 'react-native-gesture-handler';


interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductCreateScreen'> { };

export const AdminProductCreateScreen = ({ navigation, route }: Props) => {

  const { category } = route.params;
  const { name, description, responseMessage, loading, image1, image2, image3, price, errorMessage, stock, sku, sku_alt, purchase_department, promo_price, promo_quantity, tax, price3, setErrorMessage, onChange, takePhoto, pickImage, createProduct } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setnumberImage] = useState(1);


  useEffect(() => {
    if (responseMessage != '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }

  }, [responseMessage])
  
  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('');
    }

  }, [errorMessage])


  return (
    <View style={styles.container}>

      <View style={styles.imageContainer} >

        <TouchableOpacity

          onPress={() => {
            setnumberImage(1)
            setModalVisible(true)
          }}
        >
          {
            image1 == ''
              ? <Image
                style={styles.image}
                source={require('../../../../../../assets/image_add.png')}
              />
              : <Image
                source={{ uri: image1 }}
                style={styles.image}
              />
          }

        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => {
            setnumberImage(2)
            setModalVisible(true)
          }}//Muestra para mostar opcion de camara o garelia
        >
          {
            image2 == ''
              ? <Image
                style={styles.image}
                source={require('../../../../../../assets/image_add.png')}
              />
              : <Image
                source={{ uri: image2 }}
                style={styles.image}
              />
          }

        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => {
            setnumberImage(3)
            setModalVisible(true)
          }}//Muestra para mostar opcion de camara o garelia
        >
          {
            image3 == ''
              ? <Image
                style={styles.image}
                source={require('../../../../../../assets/image_add.png')}
              />
              : <Image
                source={{ uri: image3 }}
                style={styles.image}
              />
          }

        </TouchableOpacity>

      </View>

      <View style={styles.form}>

        <ScrollView>

          <View style={styles.categoryInfo}>

            <Image
              style={styles.imageCategory}
              source={require('../../../../../../assets/Order_admin.png')}
            />
            <Text style={styles.textCategory}>Categoría de gasto seleccionada: </Text>
            <Text>{category.name}</Text>

          </View>

          <CustomTextInput
            placeholder='Nombre del gasto '
            image={require('../../../../../../assets/product_name.png')}
            keyboardType='default'
            property='name'
            value={name}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder='Descripción del gasto '
            image={require('../../../../../../assets/descriptionMS.png')}
            keyboardType='default'
            property='description'
            value={description}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder='Cantidad pagada '
            image={require('../../../../../../assets/priceMS.png')}
            keyboardType='numeric'
            property='price'
            value={price}
            onChangeText={onChange}
          />
          <CustomTextInput
            placeholder='Forma de pago'
            image={require('../../../../../../assets/sku.png')}
            keyboardType='default'
            property='sku'
            value={sku}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder='En que se gasto'
            image={require('../../../../../../assets/product_category.png')}
            keyboardType='default'
            property='purchase_department'
            value={purchase_department}
            onChangeText={onChange}
          />

          
          <CustomTextInput
            placeholder='Meses'
            image={require('../../../../../../assets/stock.png')}
            keyboardType='numeric'
            property='stock'
            value={stock}
            onChangeText={onChange}
          />
         

          <View style={styles.buttonContainer}>
            <RoundedButton
              text='Crear Gasto'
              onPress={() => createProduct()}
              buttonStyle={{ backgroundColor: MyColors.admin }}
            />
          </View>
        </ScrollView>



      </View>


      <ModalPickMultipleImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        numberImage={numberImage} />

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

