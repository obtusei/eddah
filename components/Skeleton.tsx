import { View, Text } from 'react-native'
import React from 'react'

export default function Skeleton() {
  return [1,2,3,4].map((item,index) => (
          <View key={index} style={{
            padding:10,
            alignItems:"center",
            gap:5
          }}>
            <View style={{
          width:60,
          height:60,
          backgroundColor:"#DDDDDD",
          borderRadius:200
        }}/>
        <View style={{
          width:80,
          height:15,
          borderRadius:20,
          backgroundColor:"#DDDDDD",
        }}></View>
          </View>
        ))
     
}

export function AdoptSkeleton(no:number = 2) {
  return [...Array(no)].map((item,index) => (
    <View key={index} style={{
      padding:10,
      flex:1,
      flexDirection:"row",
      gap:10,
      alignItems:"center",
      backgroundColor:"#DDDDDD",
      borderRadius:20,
      marginRight:5,
      marginLeft:5,
    }}>  
      <View style={{
        width:80,
        height:120,
        backgroundColor:"#CECECE",
        borderRadius:20
        }}/>
      
      <View style={{
        flex:1,
        flexDirection:"row",
        height:"100%"
      }}>
          <View style={{
          flex:1,
          
          gap:4
        }}>
    <View style={{width:80,height:20,borderRadius:40,backgroundColor:"#CECECE",}}></View>
    <View style={{width:40,height:15,borderRadius:40,backgroundColor:"#CECECE",}}></View>
    <View style={{width:30,height:15,borderRadius:40,backgroundColor:"#CECECE",}}></View>
      </View>

      <View style={{
        justifyContent:"space-between",
        alignItems:"flex-end"
      }}>
        
          <View style={{
            backgroundColor:"#CECECE",
            width:10,
            height:10,
            borderRadius:40
        }}>
          </View>
          <View style={{
            backgroundColor:"#CECECE",
            padding:12,
            paddingHorizontal:24,
            borderRadius:40
        }}>
          </View>
        
      </View>
  </View>
      </View>
        ))
     
}