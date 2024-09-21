import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import TabBarIcon from './TabBarIcon';
import { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }) {
    const translateX = useSharedValue(0);
    const [dimentions, setDimentions] = useState({ width: 200, height: 100 });

    const buttonWidth = dimentions.width / state.routes.length;

    const onTabBarLayout = (e) => {
        console.log(e.nativeEvent);
        setDimentions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    };

    useEffect(() => {
        translateX.value = withSpring(buttonWidth * state.index, {
            duration: 1300,
        });
    }, [state.index]);

    const rCircle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={styles.tabBarContainer} onLayout={onTabBarLayout}>
            <Animated.View
                style={[
                    rCircle,
                    {
                        width: buttonWidth - 12,
                        height: dimentions.height - 15,
                        position: 'absolute',
                        backgroundColor: '#fff',
                        borderRadius: 40,
                        zIndex: -1,
                        marginHorizontal: 6,
                    },
                ]}
            />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarIcon
                        key={label}
                        onPress={onPress}
                        isFocused={isFocused}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 80,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#673ab7',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: width * 0.95,
        bottom: 250,
        paddingVertical: 15,
        shadowColor: 'black',
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 15,
        shadowOpacity: 0.5,
        elevation: 15,
    },
});
