import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, View, Text, TextInput, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import useViewModel from './ViewModel';
import styles from './Styles';
import { CustomTextInput } from '../../components/CustomTextInput';
import * as Notifications from 'expo-notifications';
import { NotificationPush } from '../../utils/NotificationPush';
import { BackgroundAnimation } from '../../../Presentation/components/BackgroundAnimation';

import { UserContext } from '../../context/UserContext';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> { };

export const HomeScreen = ({ navigation, route }: Props) => {

    console.log('El usuario ha ingresado a la pantalla HomeScreen');


    const [modalVisible, setModalVisible] = useState(false); //Implementacion Modal Confirmacion --Edgar

    const { email, password, errorMessage, setErrorMessage, onChange, login, user, updateNotificationToken, removeUserSession, saveUserSession, getUserSession } = useViewModel();

    const { notification, notificationListener, responseListener, registerForPushNotificationsAsync, setNotification } = NotificationPush();

    const { flaggy } = useContext(UserContext);

    const handlePress = async () => {
        if (user!.verify === 1) {
            login();
        }
        else {
            login();
            navigation.navigate("VerifyScreen");
        }
    }

    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
            setErrorMessage('');
        }
    }, [errorMessage])


    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user?.id !== '' && user.verify !== 0) {

            registerForPushNotificationsAsync().then(token => {
                console.log('Token Home: ' + token);
                updateNotificationToken(user?.id!, token!);
                const hasRole1 = user.roles?.some(role => role.id === "1");
                const hasRoles123 = [1, 2, 3, 4].every(role => user.roles?.some(userRole => parseInt(userRole.id) === role));

                if (hasRole1) {
                    navigation.replace('AdminTabsNavigator');
                }
                if (hasRoles123) {
                    navigation.replace('RolesScreen');
                }
                else if (user.roles === null) {
                    navigation.replace('RegisterScreen');
                }

            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [user])

    

    // Redirigimos al usuario a la pantalla de inicio si ya inició sesión
    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user.verify !== 0) {
            if (user.roles?.length! > 1) {
                navigation.replace('RolesScreen');
            }
            else if (user.roles?.some(role => role.id === "1")) {
                navigation.replace('AdminTabsNavigator');
            }
            else if (user.roles === null) {
                navigation.replace('RegisterScreen');
            }
        }
    }, [user])

    console.log('USUARIO DE SESION imagen: ' + JSON.stringify(user, null, 3));


    return (
        // COLUMN
        <View style={styles.container}>
            <BackgroundAnimation />

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/fraiche.png')}
                    style={styles.logoImage}
                />

                <Text style={styles.logoText}>Gastos</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formText}>INGRESAR</Text>

                <CustomTextInput
                    image={require('../../../../assets/emailMS.png')}
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    property='email'
                    onChangeText={onChange}
                    value={email}
                />

                <CustomTextInput
                    image={require('../../../../assets/password.png')}
                    placeholder='Contraseña'
                    keyboardType='default'
                    property='password'
                    onChangeText={onChange}
                    value={password}
                    secureTextEntry={true}
                />

                <View style={{ marginTop: 30 }}>

                    <RoundedButton text='LOGIN' onPress={() => login()} />

                </View>

                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.formRegisterText}>Regístrate</Text>
                    </TouchableOpacity>

                </View>


                <View>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <Image
                            style={styles.modalOpen}
                            source={require('../../../../assets/about.png')}
                        />
                    </TouchableOpacity>
                </View>
               

                {user !== null && user !== undefined && user.id !== '' &&
                    (
                        <View style={styles.iconContainer}>
                            {flaggy === false && (
                                <TouchableOpacity onPress={() => navigation.navigate('VerifyScreen')}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../../../../assets/alerta.png')}
                                    />
                                </TouchableOpacity>

                            )}
                            {flaggy === true && (
                                <TouchableOpacity onPress={() => { }}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../../../../assets/cheque.png')}
                                    />
                                </TouchableOpacity>

                            )}

                            {flaggy === true && (
                                <><Text style={styles.textVerify}>Perfil  verificado.</Text></>
                            )}
                            {flaggy === false && (
                                <><Text style={styles.text}>Perfil no verificado, verifica</Text><Text style={styles.text1}> pulsando el boton de alerta.</Text></>
                            )}

                        </View>
                    )
                }
            </View>

        </View>
    );
}

