import { StyleSheet } from 'react-native'


const AdminProductUpdateStyles = StyleSheet.create({

    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 50,
        flexDirection: 'row',//Acomodar los elemento uno al lado del otro
        justifyContent: 'space-evenly'// los elemnto se distribullen al anchop de la pantalla equitativamente
    },
    image: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
    },
    form: {

        backgroundColor: 'white',
        height: '65%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0
    },
    buttonContainer: {
        marginTop: 80,
        bottom: 10
    },
    categoryInfo: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCategory: {
        width: 60,
        height: 60,
    },
    textCategory: {
        color: 'gray',
        fontSize: 17,
        fontWeight: 'bold'
    }

});

export default AdminProductUpdateStyles;