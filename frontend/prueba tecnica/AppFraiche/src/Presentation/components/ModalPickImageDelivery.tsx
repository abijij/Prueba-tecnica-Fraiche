//Creacion archivo para presentacion de seleccion de imagen para clientes (MyColors) Edgar-Edgar
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ToastAndroid, TouchableOpacity } from "react-native";
import { RoundedButton } from "./RoundedButton";
import { MyColors } from "../theme/AppTheme";

interface Props {
  // Función que se ejecuta cuando se quiere abrir la galería
  openGallery: () => void,

  // Función que se ejecuta cuando se quiere abrir la cámara
  openCamera: () => void,

  // Estado booleano que indica si el modal está abierto o cerrado
  modalUseState: boolean,

  // Función para cambiar el estado del modal
  setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalPickImageDelivery = ({ openGallery, openCamera, setModalUseState, modalUseState }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalUseState}
      onRequestClose={() =>
        //ToastAndroid.show("Operacion cancelada", ToastAndroid.LONG); //Alerta al cerrar camara mejorada -Edgar
        setModalUseState(!modalUseState)
      }
    >

      <TouchableOpacity style={styles.backgroundContainer} onPress={() => setModalUseState(false)}>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            <Text>Selecciona una opcion</Text>
            <View style={styles.buttonContainer}>
              <RoundedButton
                onPress={() => {
                  openGallery()
                  setModalUseState(false)
                }}
                text='Galeria'
                buttonStyle={{
                  backgroundColor: MyColors.delivery //Cambio color de alerta dependiendo el rol del usuario
                }}
              />
            </View>
            <View style={styles.buttonContainer}>

              {/* Botón para abrir la galería */}
              <RoundedButton
                onPress={() => {
                  openCamera()
                  setModalUseState(false)
                }}
                text='Camara'
                buttonStyle={{
                  backgroundColor: MyColors.delivery //Cambio color de alerta dependiendo el rol del usuario
                }}
              />
            </View>

          </View>


        </View>
      </TouchableOpacity>

    </Modal>



  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: 250,
    height: 220,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,

    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});