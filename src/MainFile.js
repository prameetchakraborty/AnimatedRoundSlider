import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import AnimatedSlider from './AnimatedSlider';

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
                <View style={styles.timeContainer}>
                    <View style={styles.time}>
                        <View style={styles.timeHeader}>
                            <Svg height={16} width={16}>
                                <G fill="#ff9800"></G>
                            </Svg>
                            <Text style={styles.time1Text}>Time1</Text>
                        </View>
                        <Text style={styles.timeValue}>{time1.h}:{this.padMinutes(time1.m)}</Text>
                    </View>
                    <View style={styles.time}>
                        <View style={styles.timeHeader}>
                            <Svg height={16} width={16}>
                                <G fill="#ffcf00"></G>
                            </Svg>
                            <Text style={styles.wakeText}>Time2</Text>
                        </View>
                        <Text style={styles.timeValue}>{time2.h}:{this.padMinutes(time2.m)}</Text>
                    </View>
                </View>
                <View>
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
                <Text>Made with love at GeekyAnts</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
