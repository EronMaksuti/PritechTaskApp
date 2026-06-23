import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>📋</Text>
            <Text style={styles.title}>No tasks yet</Text>
            <Text style={styles.subtitle}>
                Tap the + button to add your first task
            </Text>
        </View>
    );
};



const styles = StyleSheet.create ({
container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:80,
},
emoji: {
    fontSize:48,
    marginBottom: 12,
},
title: {
    fontSize:20,
    fontWeight:'700',
    color:'#1F2937',
    marginBottom:6,
},
subtitle: {
    fontSize:14,
    color: '#9CA3AF',
    textAlign:'center',
},
});

export default EmptyState;