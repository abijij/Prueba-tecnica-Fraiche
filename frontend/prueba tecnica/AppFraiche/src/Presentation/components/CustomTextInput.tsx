import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native'

interface Props {
    image: any,// Imagen para mostrar junto al campo de texto
    placeholder: string,// Texto que se muestra como indicación en el campo de texto
    value: any,// Valor actual del campo de texto
    keyboardType: KeyboardType,// Tipo de teclado para el campo de texto (númerico, email, etc.)
    secureTextEntry?: boolean, // Si el campo de texto debe ser un campo de contraseña oculto
    property: string,// Nombre de la propiedad del objeto que se actualizará con el texto ingresado
    editable?: boolean,
    onChangeText: (property: string, value: any) => void// Función que se ejecuta cuando el texto del campo cambia
}

/**
 * Componente reutilizable de campo de texto personalizado.
 * @param image Imagen para mostrar junto al campo de texto
 * @param placeholder Texto que se muestra como indicación en el campo de texto
 * @param value Valor actual del campo de texto
 * @param keyboardType Tipo de teclado para el campo de texto (númerico, email, etc.)
 * @param secureTextEntry Si el campo de texto debe ser un campo de contraseña oculto
 * @param property Nombre de la propiedad del objeto que se actualizará con el texto ingresado
 * @param onChangeText Función que se ejecuta cuando el texto del campo cambia
 */
export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    editable = true,
    onChangeText

}: Props) => {
    return (
        <View style={styles.formInput}>
            <Image
                style={styles.formIcon}
                source={image}
            />
            <TextInput
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={text => onChangeText(property, text)}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
})
