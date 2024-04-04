import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Rol } from '../../../Domain/entities/Rol';
import { MyColors } from '../../theme/AppTheme';
import { RootStackParamList } from '../../navigator/MainStackNavigator';

interface Props {
    rol: Rol,// objeto que representa el rol a mostrar
    height: number,// altura del contenedor del rol
    width: number,// ancho del contenedor del rol
    navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>// objeto de navegación
}

export const RolesItem = ({ rol, height, width, navigation }: Props) => {

    const titleContainerColor = () => {
        switch (rol.name) {
            case 'ADMIN':
                return MyColors.admin;
            case 'CLIENTE':
                return MyColors.client;
            case 'REPARTIDOR':
                return MyColors.delivery;
            case 'PROVEEDOR':
                return MyColors.delivery;
            default:
                return MyColors.client; // Color predeterminado en caso de que el rol no coincida con ninguno de los casos anteriores
        }
    };

    return (
        <TouchableOpacity
            onPress={() => {  // si el rol es administrador, se navega a la pantalla de administrador
                if (rol.name == 'ADMIN') {
                    navigation.replace('AdminTabsNavigator');
                }
                else if (rol.name == 'CLIENTE') {// si el rol es cliente, se navega a la pantalla de cliente
                    navigation.replace('ClientTabsNavigator');
                }
                else if (rol.name == 'REPARTIDOR') {// si el rol es cliente, se navega a la pantalla de cliente
                    navigation.replace('DeliveryTabsNavigator');
                }
                else if (rol.name == 'PROVEEDOR') {// si el rol es cliente, se navega a la pantalla de cliente
                    navigation.replace('ClientTabsNavigator');
                }
            }}
            style={{ ...styles.container, height: height, width: width }}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: rol.image }} />
                <View style={{ ...styles.titleContainer, backgroundColor: titleContainerColor() }}>
                    <Text style={styles.title}>{rol.name}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingHorizontal: 7,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    titleContainer: {
        height: 70,
        backgroundColor: MyColors.client, // color de fondo del contenedor del título
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
    },
    title: {
        color: 'white',
        fontSize: 20
    }
})
