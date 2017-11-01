import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import AnimatedSlider from './AnimatedSlider';
import Love from '../images/love_icon.png';
import GeekyAnts from '../images/geekyants.png';
import style from './style';
import Timer from './Timer';

export default class App extends React.Component {
    state = {
        startAngle: Math.PI * 10 / 6,
        angleLength: Math.PI * 7 / 6,
    }

    calculateMinutesFromAngle(angle) {
        return Math.round(angle / (2 * Math.PI / (12 * 12))) * 5;
    }

    calculateTimeFromAngle(angle) {
        const minutes = this.calculateMinutesFromAngle(angle);
        const h = Math.floor(minutes / 60);
        const m = minutes - h * 60;

        return { h, m };
    }

    roundAngleToFives(angle) {
        const fiveMinuteAngle = 2 * Math.PI / 144;

        return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
    }

    padMinutes(min) {
        if (`${min}`.length < 2) {
            return `0${min}`;
        }

        return min;
    }

    onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
        this.setState({ minutesLong });
    }

    onUpdate = ({ startAngle, angleLength }) => {
        this.setState({
            startAngle: roundAngleToFives(startAngle),
            angleLength: roundAngleToFives(angleLength)
        });
    }

    render() {
        const { startAngle, angleLength } = this.state;
        const time1 = this.calculateTimeFromAngle(startAngle);
        const time2 = this.calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI));

        return (
            <View style={styles.container}>
                <View style={style.timeContainer}>
                    <View style={style.time}>
                        <View style={style.timeHeader}>
                            <Svg height={16} width={16}>
                                <G fill="#ff9800"></G>
                            </Svg>
                            <Text style={styles.time}>TIME 1</Text>
                        </View>
                        <Text style={styles.text}>{time1.h}:{this.padMinutes(time1.m)}</Text>
                    </View>
                    <View style={style.time}>
                        <View style={style.timeHeader}>
                            <Svg height={16} width={16}>
                                <G fill="#ffcf00"></G>
                            </Svg>
                            <Text style={styles.time}>TIME 2</Text>
                        </View>
                        <Text style={styles.text}>{time2.h}:{this.padMinutes(time2.m)}</Text>
                    </View>
                </View>
                <View>
                    <Timer
                        style={style.sleepTimeContainer}
                        minutesLong={this.calculateMinutesFromAngle(angleLength)}
                    />
                    <AnimatedSlider
                        startAngle={this.state.startAngle}
                        angleLength={this.state.angleLength}
                        onUpdate={({ startAngle, angleLength }) => this.setState({ startAngle, angleLength })}
                        segments={5}
                        strokeWidth={40}
                        radius={145}
                        gradientColorFrom="#ff9800"
                        gradientColorTo="#ffcf00"
                        showClockFace
                        clockFaceColor="#9d9d9d"
                        bgCircleColor="#171717" />
                </View>
                <Text style={styles.footer}>MADE WITH 
                <Image 
                source = {Love}
                style={{ marginLeft: 2, width: 20, height: 20, marginTop: 2 }}
                /> 
                AT 
                <Image source = {GeekyAnts}
                style={{ marginLeft: 2, width: 20, height: 20, marginTop: 2 }}
                />
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
    },
    time: {
        color: 'white',
        fontSize: 25,
        fontWeight: "800",
    },
    footer: {
        color: 'white',
        fontSize: 15,
        fontWeight: "bold",
    }
});
