import { HomeScreen } from '../../../src/Presentation/views/home/Home';
import { VerifyScreen } from '../../../src/Presentation/views/verify/VerifyScreen';
import { RegisterScreen } from '../../../src/Presentation/views/register/Register';
import { RolesScreen } from '../../../src/Presentation/views/roles/Roles';
import { AdminTabsNavigator } from '../../../src/Presentation/navigator/AdminTabsNavigator';
import { AdminProfileUpdateScreen } from '../../../src/Presentation/views/profileAdmin/update/AdminProfileUpdate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { User } from '../../Domain/entities/User';
import { UserProvider } from '../context/UserContext';
import { StyleSheet } from 'react-native';



// Definir la interfaz para los nombres de pantalla y los tipos de parámetros aceptados
export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined,
  VerifyScreen: undefined,
  RolesScreen: undefined,
  ProfileUpdateScreen: { user: User },
  AdminProfileUpdateScreen: { user: User },
  AdminTabsNavigator: undefined,

}

// Crear un stack de navegación nativo utilizando la interfaz definida anteriormente
const Stack = createNativeStackNavigator<RootStackParamList>();

const deliveryHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: "#8EC306"
  },
  title: {
    color: 'white'
  }
})
const adminHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: "#4CC3E9"
  },
  title: {
    color: 'white'
  }
})
const clientHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: "#8EC306"
  },
  title: {
    color: 'white'
  }
})


export const MainStackNavigator = () => {
  return (
    <UserState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // Ocultar la barra de navegación por defecto
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Crear usuario', // Definir el título de la barra de navegación
            headerStyle: clientHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
            headerTintColor: clientHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
          }}
        />

        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{
            headerTitleAlign: 'center',
            headerShown: true, // Mostrar la barra de navegación
            title: 'Verificación SMS', // Definir el título de la barra de navegación
            headerStyle: clientHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
            headerTintColor: clientHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
          }}
        />

        <Stack.Screen
          name="RolesScreen"
          component={RolesScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Selecciona un rol', // Definir el título de la barra de navegación}
            headerTitleAlign: 'center'
          }}
        />

        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />

        <Stack.Screen
          name="AdminProfileUpdateScreen"
          component={AdminProfileUpdateScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Actualización de usuario', // Definir el título de la barra de navegación
            headerStyle: adminHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
            headerTintColor: adminHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
          }}
        />

        
      </Stack.Navigator>
    </UserState>
  )
}


//Nos permite esparcir la informacion por las pantallas por el context que realizamos
const UserState = ({ children }: any) => {
  return (
    <UserProvider>

      {children}

    </UserProvider>
  )
}
