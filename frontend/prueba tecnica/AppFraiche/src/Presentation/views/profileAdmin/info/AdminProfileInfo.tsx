import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, Image, Pressable } from 'react-native'
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import useViewModel from './ViewModel';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';
import { MyColors } from '../../../theme/AppTheme';
import { BackgroundAnimation } from '../../../../Presentation/components/BackgroundAnimation';





export const AdminProfileInfoScreen = () => {


  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // Get removeSession function from ViewModel using custom hook useViewModel
  const { user, removeUserSession } = useViewModel();
  const requiredRoleIds = [1, 2, 3];


  useEffect(() => {
    if (user.id === '') {
      navigation.replace('HomeScreen');
    }

  }, [user])

  return (
    <View style={styles.container}>
     <BackgroundAnimation />


      <Pressable
        style={styles.logOut}
        onPress={() => {
          removeUserSession();

        }} >
        <Image
          source={require('../../../../../assets/logoutMS.png')}
          style={styles.logOutImage}
        />
      </Pressable>

      

      <View style={styles.logoContainer}>
        {
          user?.image !== ''
          &&
          <Image
            /** Mandamos a llamar la imagen del usuario **/
            source={{ uri: user?.image }}
            style={styles.logoImage}
          />
        }
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require('../../../../../assets/userMS.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.name} {user?.lastname}</Text>
            <Text style={styles.formTextDescription}>Nombre del usuario</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require('../../../../../assets/email.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.email}</Text>
            <Text style={styles.formTextDescription}>Correo del usuario</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 70 }}>
          <Image
            source={require('../../../../../assets/phoneMS.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.phone}</Text>
            <Text style={styles.formTextDescription}>Teléfono del usuario</Text>
          </View>
        </View>

        <View style={{ position: 'absolute', width: '100%', paddingLeft: 50, paddingTop: 200 }}>
          <RoundedButton
            onPress={() => {
              navigation.navigate('AdminProfileUpdateScreen', { user: user! })
            }}
            text='Actualizar Información'
            buttonStyle={{ backgroundColor: MyColors.admin }}
          />
        </View>
        <View style={{ position: 'absolute', paddingTop: 260 }}>
        </View>
      </View>
    </View>
  )
}
