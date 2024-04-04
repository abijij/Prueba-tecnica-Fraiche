import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MyColors } from '../theme/AppTheme'

interface Props {
    text: string,// Texto que se mostrará en el botón
    onPress: () => void,// Función que se ejecutará cuando se presione el botón
    buttonStyle?: object, // Prop para el estilo adicional del botón
    value?: string,
}

/**
 * Componente que representa un botón redondeado con un fondo de color primario.
 * 
 * @param text Texto que se mostrará en el botón
 * @param onPress Función que se ejecutará cuando se presione el botón
 * @param buttonStyle Función para poder cambiar el color del botón dependiendo 
 *                    la pantalla que se utilice -- Edgar
 */
export const RoundedButton = ({ text, onPress, buttonStyle }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.roundedButton, buttonStyle]}
            onPress={() => onPress()}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}

export const DeliveryRoundedButton = ({ text, onPress, buttonStyle }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.deliveryRoundedButton, buttonStyle]}
            onPress={() => onPress()}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}

export const AdminRoundedButton = ({ text, onPress, buttonStyle }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.adminRoundedButton, buttonStyle]}
            onPress={() => onPress()}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.client,// Color de fondo del botón
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15// Radio de los bordes del botón
    },
    textButton: {
        color: 'white',// Color del texto del botón
        fontSize: 16
        // fontWeight: 'bold'
    },
    deliveryRoundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.delivery,// Color de fondo del botón
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15// Radio de los bordes del botón
    },
    adminRoundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.admin,// Color de fondo del botón
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15// Radio de los bordes del botón
    }
});
