import Colors from "@/constants/Color"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function ModalHeaderText() {

    const [active, setActive] = useState<number>(0)
    
    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => setActive(0)}>
                <Text 
                    style={[styles.btnText, {
                        color: active === 0 ? '#000' : Colors.grey,
                        textDecorationColor: active === 0 ? 'underline' : 'none'
                    }]}
                >
                    Stay
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setActive(1)}>
                <Text 
                    style={[styles.btnText, {
                        color: active === 1 ? '#000' : Colors.grey,
                        textDecorationColor: active === 1 ? 'underline' : 'none'
                    }]}
                >
                    Experiences
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    }  
})