import React, { useState } from 'react'
import { Modal, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../../../../Domain/entities/Category';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigator/MainStackNavigator';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';
import { ModalDeleteConf } from '../../../../components/ModalDeleteConf';

interface Props {
    category: Category;
    remove: (id: string) => void;
}


export const AdminCategoryListItem = ({ category, remove }: Props) => {

    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>();

    const [modalVisible, setModalVisible] = useState(false);
    const deleteConfirm = () => {
        remove(category.id!);
    }

    return (

        <TouchableOpacity

            onPress={() => navigation.navigate('AdminProductNavigator', { category: category })}
        >
            <View style={styles.container}>

                {/* Imagen categoría*/}
                <Image
                    style={styles.image}
                    source={{ uri: category.image }}
                />

                {/* Nombre y Drescripcion*/}
                <View style={styles.info}>
                    <Text style={styles.title}>{category.name}</Text>
                    <Text style={styles.description}>{category.description}</Text>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity

                        onPress={() => navigation.navigate('AdminCategoryUpdateScreen', { category: category })}
                    >
                        <Image
                            style={styles.actionImage}
                            source={require('../../../../../../assets/edit.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalVisible(true)} //Metodo para ejecutar el modal de confirmacion --Edgar
                    >
                        <Image
                            style={styles.actionImage}
                            source={require('../../../../../../assets/trash.png')}
                        />
                    </TouchableOpacity>

                </View>
                <ModalDeleteConf
                    onDelete={deleteConfirm}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
            </View>

            <View style={styles.divider}></View>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        height: 70,
        marginHorizontal: 20,
        marginTop: 10

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 15,
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 3
    },
    actionContainer: {
        marginRight: 40,
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical: 2,
        resizeMode: "contain"
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 30,
        flex: 1


    }

});


