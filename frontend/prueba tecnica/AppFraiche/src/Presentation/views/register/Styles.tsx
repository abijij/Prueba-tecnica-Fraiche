import { StyleSheet } from 'react-native';

// Definición de estilos usando la API StyleSheet
const RegisterStyles = StyleSheet.create({
    // Estilo para el contenedor principal de la pantalla
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    // Estilo para la imagen de fondo que cubre toda la pantalla
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '10%'
    },
    // Estilo para el formulario que se muestra sobre la imagen de fondo
    form: {
        width: '100%',
        height: '72%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    // Estilo para el texto en negrita del formulario
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
     // Estilo para el icono del formulario
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    // Estilo para el contenedor de cada campo de entrada del formulario
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
     // Estilo para el campo de entrada de texto del formulario
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
    // Estilo para el botón de registro del formulario
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    // Estilo para el texto del botón de registro del formulario
    formRegisterText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    },
    // Estilo para el contenedor del logo en la parte superior de la pantalla
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '4%',
        alignItems: 'center'
    },
     // Estilo para la imagen del logo
    logoImage: {
        width: 120,
        height: 120,
        borderRadius: 80,
        resizeMode: "contain",
        borderColor: 'white',
        borderWidth: 2
    },
    // Estilo para el texto debajo de la imagen del logo
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
     // Estilo para el indicador de carga
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left:0, 
    }
});

// Exportación del objeto de estilos RegisterStyles
export default RegisterStyles;