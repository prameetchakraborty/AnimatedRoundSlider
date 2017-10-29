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
        const bedtime = this.calculateTimeFromAngle(startAngle);
        const waketime = this.calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI));

        return ();
    }
}
