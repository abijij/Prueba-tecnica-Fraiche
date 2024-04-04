import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../../../../Domain/entities/Category';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigator/MainStackNavigator';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { ModalDeleteConf } from '../../../../components/ModalDeleteConf';

interface Props {
    product: Product;
    category: Category;
    remove: (product: Product) => void;
}

export const AdminProdcuctListItem = ({ product, category, remove }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const deleteConfirm = () => {
        remove(product);
    };

    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>();

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                {/* Imagen del producto*/}
                <Image style={styles.image} source={{ uri: product.image1 }} />

                {/* Nombre y Descripción*/}
                <View style={styles.info}>
                    <Text style={styles.title}>{product.name}</Text>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                    <Text style={styles.price}>${product.price}</Text>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('AdminProductUpdateScreen', { product: product, category: category })
                        }>
                        <Image style={styles.actionImage} source={require('../../../../../../assets/edit.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image style={styles.actionImage} source={require('../../../../../../assets/trash.png')} />
                    </TouchableOpacity>
                </View>
                <ModalDeleteConf onDelete={deleteConfirm} setModalVisible={setModalVisible} modalVisible={modalVisible} />
            </View>

            <View style={styles.divider}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        paddingTop: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15,
        resizeMode: 'contain',
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 13,
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 3,
    },
    actionContainer: {
        marginRight: 40,
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical: 2,
        resizeMode: 'contain',
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 30,
        flex: 1,
    },
    price: {
        color: 'green',
        fontSize: 10,
        fontWeight: 'bold',
        bottom: 2
    },
});
