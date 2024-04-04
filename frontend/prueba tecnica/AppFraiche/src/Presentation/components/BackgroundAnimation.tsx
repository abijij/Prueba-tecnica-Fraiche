import React, { useContext, useEffect } from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native'
import LottieView from 'lottie-react-native';

export const BackgroundAnimation = () => {

    return (
        <>
            <LottieView
                source={require('../../../assets/BackgroundFC.json')}
                autoPlay
                style={styles.Image}

            />
        </>
    )
}

export const BackgroundAnimationRegister = () => {

    return (
        <>
            <LottieView
                source={require('../../../assets/RegisterBackground.json')}
                autoPlay
                style={styles.registerImage}

            />
        </>
    )
}

export const BackgroundAnimationProfile = () => {

    return (
        <>
            <LottieView
                source={require('../../../assets/ProfileBackground.json')}
                autoPlay
                style={styles.profileImage}

            />
        </>
    )
}

export const BackgroundAnimationProfileUpdate = () => {

    return (
        <>
            <LottieView
                source={require('../../../assets/ProfileUpdateBackground.json')}
                autoPlay
                style={styles.profileImage}

            />
        </>
    )
}

const styles = StyleSheet.create({
    Image: {
        width: 463,
        height: 999
    },
    registerImage: {
        width: '0%',
        height: '85%'
    },
    profileImage: {
        top: '0%',
        width: '100%',
        height: '90%'
    }
})