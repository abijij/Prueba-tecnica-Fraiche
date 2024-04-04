import React, { useContext, useEffect } from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native'
import LottieView from 'lottie-react-native';

export const ApprovedAnimation = () => {

    return(
        <>
            <LottieView
                source={require('../../../assets/approved.json')}
                autoPlay
                style={styles.Image}
                
            />
        </>
    )
}

const styles = StyleSheet.create({
    Image:{
        width: 100,
        height: 100,
        marginTop: '20%',
    },
})
