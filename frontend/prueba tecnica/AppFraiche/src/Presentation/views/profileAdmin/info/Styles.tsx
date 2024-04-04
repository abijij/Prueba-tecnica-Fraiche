import { StyleSheet } from "react-native";
import { MyColors } from "../../../theme/AppTheme";
const ProfileInfoStyles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: 'black'

    }, imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formInfo: {
        flexDirection: 'row',
        alignItems: "center"
    },
    formContent: {
        marginLeft: 15
    },
    formTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    formImage: {
        height: 30,
        width: 30
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%'
    },
    logoImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        resizeMode: "contain",
        borderColor: 'white',
        borderWidth: 2
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    logOut: {
        position: 'absolute',
        alignSelf: "center",
        top: 40,
        right: 5,
    },
    logOutImage: {
        width: 50,
        height: 50,
    },
    change: {
        position: 'absolute',
        alignSelf: "center",
        top: 95,
        right: 5,
    },

});

export default ProfileInfoStyles;