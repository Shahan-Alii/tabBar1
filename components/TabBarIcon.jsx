import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const icons = {
    Home: (props) => <Feather name="home" size={24} {...props} />,
    Settings: (props) => <Feather name="settings" size={24} {...props} />,
    Explore: (props) => <Feather name="compass" size={24} {...props} />,
    Profile: (props) => <Feather name="user" size={24} {...props} />,
};

const TabBarIcon = ({ onPress, isFocused, label }) => {
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(isFocused ? 0 : 1, { duration: 400 });
        translateY.value = withTiming(isFocused ? 12 : 0, { duration: 400 });
        scale.value = withTiming(isFocused ? 1.4 : 1, { duration: 400 });
    }, [isFocused]);

    const rText = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const rImage = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
            }}
        >
            <Animated.View style={rImage}>
                {icons[label]({ color: isFocused ? '#673ab7' : '#fff' })}
            </Animated.View>

            <Animated.Text
                style={[
                    { color: isFocused ? '##673ab7' : '#fff', fontWeight: 600 },
                    rText,
                ]}
            >
                {label}
            </Animated.Text>
        </TouchableOpacity>
    );
};

export default TabBarIcon;

const styles = StyleSheet.create({});
