import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Category } from '../../Domain/entities/Category';
import { CategoryProvider } from '../context/CategoryContext';
import { AdminCategoryCreateScreen } from '../views/admin/category/create/CategoryCreate';
import { AdminCategoryUpdateScreen } from '../views/admin/category/update/CategoryUpdate';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { Image, TouchableOpacity } from 'react-native';
import { AdminProductNavigator } from './AdminProductNavigator'
import { StyleSheet } from 'react-native';


export type CategoryStackParamList = {


  AdminCategoryListScreen: undefined,
  AdminCategoryCreateScreen: undefined,
  AdminCategoryUpdateScreen: { category: Category },
  AdminProductNavigator: { category: Category },

}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const categoryHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: "#4CC3E9"
  },
  title: {
    color: 'white'
  }
})

export const AdminCategoryNavigator = () => {

  return (


    <CategoryState>

      <Stack.Navigator screenOptions={{
        headerShown: false // Ocultar la barra de navegación por defecto
      }}>

        <Stack.Screen
          name="AdminCategoryListScreen"
          component={AdminCategoryListScreen}
          options={({ route, navigation }) => (
            {
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Gastos',
              headerStyle: categoryHeaderStyles.header,// Aplicar el estilo personalizado al fondo del encabezado  --Edgar
              headerTintColor: categoryHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar+

              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
                  <Image
                    source={require('../../../assets/add.png')}
                    style={{ width: 35, height: 35 }}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />
        <Stack.Screen
          name="AdminCategoryCreateScreen"
          component={AdminCategoryCreateScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Nueva categoría de gastos', // Definir el título de la barra de navegación
            headerStyle: categoryHeaderStyles.header,// Aplicar el estilo personalizado al fondo del encabezado  --Edgar
            headerTintColor: categoryHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
          }} />

        <Stack.Screen
          name="AdminCategoryUpdateScreen"
          component={AdminCategoryUpdateScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Editar categoría de gastos', // Definir el título de la barra de navegación
            headerStyle: categoryHeaderStyles.header,// Aplicar el estilo personalizado al fondo del encabezado  --Edgar
            headerTintColor: categoryHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
          }} />

        <Stack.Screen
          name="AdminProductNavigator"
          component={AdminProductNavigator}
        />

      </Stack.Navigator>
    </CategoryState>


  )
}


//Nos permite esparcir la informacion por las pantallas por el context que realizamos
const CategoryState = ({ children }: any) => {
  return (
    <CategoryProvider>

      {children}

    </CategoryProvider>

  )
}