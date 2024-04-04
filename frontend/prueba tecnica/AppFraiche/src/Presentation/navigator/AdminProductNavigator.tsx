import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Category } from '../../Domain/entities/Category';
import { AdminProductListScreen } from '../views/admin/product/list/ProductList';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoryStackParamList } from './AdminCategoryNavigator';
import { AdminProductCreateScreen } from '../views/admin/product/create/ProductCreate'
import { TouchableOpacity, Image } from 'react-native';
import { ProductProvider } from '../context/ProductContext';
import { AdminProductUpdateScreen } from '../views/admin/product/update/ProductUpdate';
import { Product } from '../../Domain/entities/Product';
import { StyleSheet } from 'react-native';


export type ProductStackParamList = {

    AdminProductListScreen: { category: Category },
    AdminProductCreateScreen: { category: Category },
    AdminProductUpdateScreen: { category: Category, product: Product },
    

}

interface Props extends StackScreenProps<CategoryStackParamList, 'AdminProductNavigator'> { };

const Stack = createNativeStackNavigator<ProductStackParamList>();

const productHeaderStyles = StyleSheet.create({
    header: {
        backgroundColor: "#4CC3E9"
    },
    title: {
        color: 'white'
    }
})

export const AdminProductNavigator = ({ navigation, route }: Props) => {
    return (

        <ProductState>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='AdminProductListScreen'
                    component={AdminProductListScreen}
                    initialParams={{ category: route.params.category }}
                    options={({ route, navigation }) => (
                        {
                            headerShown: true,
                            title: 'Gastos de la categoria',
                            headerTitleAlign: 'center',
                            headerStyle: productHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
                            headerTintColor: productHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AdminProductCreateScreen')}>
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
                    name='AdminProductCreateScreen'
                    component={AdminProductCreateScreen}
                    initialParams={{ category: route.params.category }}
                    options={{
                        title: 'Nuevo gasto',
                        headerShown: true,
                        headerStyle: productHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
                        headerTintColor: productHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
                    }}
                />


                <Stack.Screen
                    name='AdminProductUpdateScreen'
                    component={AdminProductUpdateScreen}
                    options={({ route, navigation }) => (
                        {
                            headerShown: true,
                            title: 'Actualizar gasto',
                            headerTitleAlign: 'center',
                            headerStyle: productHeaderStyles.header, // Aplicar el estilo personalizado al fondo del encabezado --Edgar
                            headerTintColor: productHeaderStyles.title.color, // Aplicar el estilo personalizado al color del título del encabezado --Edgar
                           
                        }
                    )}
                />

             

            </Stack.Navigator>
        </ProductState>
    )
}

const ProductState = ({ children }: any) => {

    return (

        <ProductProvider>

            {children}

        </ProductProvider>


    )

}