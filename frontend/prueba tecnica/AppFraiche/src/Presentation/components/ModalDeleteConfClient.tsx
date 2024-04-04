//Implementacion Modal confirmacion para eliminar categorías, productos, direcciones --Edgar

import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RoundedButton } from "./RoundedButton";
import { MyColors } from "../theme/AppTheme";

interface Props {
  // Función que se ejecuta al confirmar la eliminación
  onDelete: () => void;

  // Estado booleano que indica si el modal está abierto o cerrado
  modalVisible: boolean;

  // Función para cambiar el estado del modal
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDeleteConfClient = ({
  onDelete,
  modalVisible,
  setModalVisible,
}: Props) => {
  const handleConfirmDelete = () => {
    onDelete();
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.backgroundContainer}
        onPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Seguro que quiere eliminar?</Text>
            <View style={styles.buttonContainer}>
              <RoundedButton
                onPress={handleConfirmDelete}
                text="Confirmar"
                buttonStyle={{
                  backgroundColor: MyColors.client,
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <RoundedButton
                onPress={() => setModalVisible(false)}
                text="Cancelar"
                buttonStyle={{
                  backgroundColor: MyColors.client,
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
    marginTop: 22,
  },
  modalView: {
    width: 250,
    height: 200,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    marginBottom: 4,
    textAlign: "center",
  },
});
