import { StyleSheet } from 'react-native';
import { MyColors } from '../../theme/AppTheme';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    },
    modalOpen: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: -2,
        left: 0,
        paddingRight: 20,
        width: 25,
        height: 25
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '15%',
        borderRadius: 40,
        paddingHorizontal: 30,
        paddingVertical: 30,
        // alignItems: 'stretch' // Agregado para estirar los elementos verticalmente
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        left: 15
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: MyColors.client,
        borderBottomWidth: 1,
        borderBottomColor: MyColors.client,
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%',
        alignItems: 'center'
    },
    logoImage: {
        width: 210,
        height: 150
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    iconContainer: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 9999,
    },
    icon: {
        width: 30,
        height: 30,
        left: -30,
        top: '-1000%'
    },
    text: {
        marginLeft: 5,
        fontSize: 12,
        color: 'white',
        top: '-530%',
        left: 5
        // Ajusta los estilos del texto según tus necesidades
    },
    text1: {
        marginLeft: 1,
        fontSize: 12,
        color: 'white',
        top: '-530%',
        left: 5
        // Ajusta los estilos del texto según tus necesidades
    },
    textVerify: {
        marginLeft: 28,
        fontSize: 12,
        color: 'white',
        top: '-530%',
        left: -20
        // Ajusta los estilos del texto según tus necesidades
    },
});


export default HomeStyles;
