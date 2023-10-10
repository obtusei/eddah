import { Text, View } from "react-native";


export function colorCheck(gender:string){
  const bg = () => gender.toLowerCase() == "female" ? "#FFE9E9": gender.toLowerCase() == "male" ? "#E1F0F9":"#FEF8D9"
  const bgBox = () => gender.toLowerCase() == "female" ? "#FFD5D5": gender.toLowerCase() == "male" ? "#C5E2F4":"#F7EFC6"
  const accent = () => gender.toLowerCase() == "female" ? "#FF6C6C": gender.toLowerCase() == "male" ? "#359DD8":"#F9D102"
  const icon = () => gender.toLowerCase() == "female" ? "gender-female": gender.toLowerCase() == "male" ? "gender-male":"gender-non-binary"
  return {bg, bgBox, accent, icon}
}
export function BreedBox({bgBox,accent,breed}:any){
  return (
    <View style={{ alignItems: 'baseline' }}>
        <View style={{ backgroundColor: bgBox,padding:6, borderRadius:10 }}>
            <Text style={{ fontSize:12,fontFamily:"Comfortaa-R",
        color:accent }}>{breed}</Text>
        </View>
    </View>
  )
}

export function Spacer({gap=10}:{gap?:number}){
  return <View style={{height:gap}}/>
}