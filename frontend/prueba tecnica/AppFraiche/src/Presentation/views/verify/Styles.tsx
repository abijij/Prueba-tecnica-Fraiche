import { StyleSheet } from 'react-native';
import { MyColors } from '../../theme/AppTheme';

const VerifyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '90%',
        height: '75%',
        backgroundColor: 'white',
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 35
    },
    imageContainer: { // --Edgar 
        alignItems: 'center', // Centra la imagen horizontalmente
        marginBottom: 10, // Espacio entre la imagen y el cuadro de texto
      },
      image: { // --Edgar 
        width: 100, // Ancho deseado de la imagen
        height: 100, // Alto deseado de la imagen
        resizeMode: 'contain', // Ajuste de la imagen (puedes modificarlo según tus necesidades)
        marginBottom: 10, // Espacio entre la imagen y el cuadro de texto
      },
    textInput: { // --Edgar 
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        textAlign: 'center',
        paddingLeft: 10,
        marginTop: 10, // Espacio entre la imagen y el cuadro de texto
      },
    sendVerification: {
        backgroundColor: '#8EC306',
        paddingVertical: 10,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
    },
    sendCode: {
        backgroundColor: '#8EC306',
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});


export default VerifyStyles;