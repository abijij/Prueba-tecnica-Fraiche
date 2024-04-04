import React, { useState } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RolesItem } from './Item';
import useViewModel from './ViewModel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';

interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'>{};

/**
 * RolesScreen es un componente que muestra los roles disponibles del usuario en un carrusel de elementos.
 * 
 * @param {Props} Props - Objeto que contiene las propiedades de navegación de StackScreenProps.
 * @returns Componente de React con el carrusel de elementos que representan los roles del usuario.
 */
export const RolesScreen = ({navigation, route}: Props) => {

  const { user } = useViewModel();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [mode, setMode] = useState<any>('horizontal-stack');
  const [snapDirection, setSnapDirection] = useState<'left'|'right'>('left');

   /**
   * Renderiza el componente con el carrusel de elementos que representan los roles del usuario.
   * 
   * @returns Componente de React con el carrusel de elementos que representan los roles del usuario.
   */
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <View style={{
        position: 'absolute',
        alignSelf: 'center',
        top: height * 0.1

      }}>

        <Carousel
          loop={true}
          width={width}
          height={height}
          autoPlay={false}
          data={ user?.roles! }
          scrollAnimationDuration={5000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={ ({item}) => <RolesItem rol={ item } height={height * 0.62 } width={ width - 70 } navigation={navigation}/>}
          modeConfig={{
            snapDirection,
            stackInterval: 30
          }}
          mode={mode}
          />
      </View>
    </GestureHandlerRootView>
  )
}
