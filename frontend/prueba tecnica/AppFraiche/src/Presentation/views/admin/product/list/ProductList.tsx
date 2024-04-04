import React, { useEffect, useState } from 'react'
import { Text, ToastAndroid, TouchableOpacity, View, Image, RefreshControl } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import useViewModel from './ViewModel';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { AdminProdcuctListItem } from './Item';
import styles from './Styles';
import { PaginationBar } from '../../../../components/PaginationBar';



interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'> { };

export const AdminProductListScreen = ({ navigation, route }: Props) => {

  const { category } = route.params;
  const { products, responseMessage, selectedPage, totalPages, handlePageChange, deleteProduct, getProducts, getTotalProducts, getProductsPagination } = useViewModel();

  useEffect(() => {
    console.log(`Número de página seleccionado: ${selectedPage}`);
  }, [selectedPage]);

  console.log('Productos paginados', JSON.stringify(products, null, 3))

  useEffect(() => {
    if (category.id !== undefined) {
      getTotalProducts(category.id!);
      getProductsPagination(category.id!, selectedPage);
    }
  }, [selectedPage])



  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={products.sort((a, b) => a.name.localeCompare(b.name))} //Orden alfabético -- Edgar
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AdminProdcuctListItem product={item} remove={deleteProduct} category={category} />}

      />

      <PaginationBar
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </View>
  )
}


