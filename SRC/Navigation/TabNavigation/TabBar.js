import { Dimensions, StyleSheet, View } from 'react-native'

import { COLORS } from '../../Constants/DesignConstants'
import React from 'react'
import Tab from './Tab'

const { width } = Dimensions.get('screen')
const TabBar = ({ state, navigation }) => {
    const { routes } = state
    const [selected, setSelected] = React.useState('Home')
    const renderColor = currentTab => (currentTab === selected ? COLORS.black: COLORS.primary)
    const renderColor1 = currentTab => (currentTab === selected ? COLORS.black : null)
    const renderRadius = currentTab => (currentTab === selected ? 30 : 0)
    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab)
            navigation.navigate(activeTab)
        }
    }

    return (
        <View style={styles.wrapper} >
            <View style={styles.container}>
                { routes.map((route, index) =>
                    <Tab tab={route}
                        icon={route.params.icon}
                        Handler={() => handlePress(route.name, route.key)}
                        color1 = {renderColor1(route.name)}
                        color={renderColor(route.name)}
                        radius={renderRadius(route.name)}
                        key={route.key}
                    /> )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 5,
        width: width,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        height: 60,
        width: '100%',
        borderRadius: 30,
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: {
	                  width: 0,
	                  height: 2,
                    },
        shadowOpacity: 0.30,
        shadowRadius: 3.84,
    }
})



export default TabBar