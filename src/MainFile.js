import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import AnimatedSlider from './AnimatedSlider';
import Love from '../images/love_icon.png';
import GeekyAnts from '../images/geekyants.png';
import style from './style';

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

    fiveMinuteAngle(angle) {
        const fiveMinuteAngle = 2 * Math.PI / 144;
        return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
    }

    padMinutes(min) {
        if (`${min}`.length < 2) 
        {
            return `0${min}`;
        }
        return min;
    }

    onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
        this.setState({ minutesLong });
    }

    onUpdate = ({ startAngle, angleLength }) => {
        this.setState({
            startAngle: fiveMinuteAngle(startAngle),
            angleLength: fiveMinuteAngle(angleLength)
        });
    }

    render() {
        const { startAngle, angleLength } = this.state;
        const time1 = this.calculateTimeFromAngle(startAngle);
        const time2 = this.calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI));
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <View>
                            <Svg height={16} width={16}>
                                <G fill="#ff9800"></G>
                            </Svg>
                            {/*<Text style={styles.time}>TIME 1</Text>*/}
                        </View>
                        {/*<Text style={styles.text}>{time1.h}:{this.padMinutes(time1.m)}</Text>*/}
                    </View>
                    <View style={style.time}>
                        <View style={style.timeHeader}>
                            <Svg height={16} width={16}>
                                <G fill="#ffcf00"></G>
                            </Svg>
                            {/*<Text style={styles.time}>TIME 2</Text>*/}
                        </View>
                        {/*<Text style={styles.text}>{time2.h}:{this.padMinutes(time2.m)}</Text>*/}
                    </View>
                </View>
                <View>
                    <AnimatedSlider
                        startAngle={this.state.startAngle}
                        angleLength={this.state.angleLength}
                        onUpdate={({ startAngle, angleLength }) => this.setState({ startAngle, angleLength })}
                        segments={5}
                        strokeWidth={30}
                        radius={150}
                        gradientColorFrom="#ff4000"
                        gradientColorTo="#afff70"
                        bgCircleColor="#171717" />
                </View>
                <View style={styles.help}>
                    <Animatable.Text style={styles.helptext} iterationCount={100} animation="fadeIn" duration={1500} direction="alternate">MOVE THE SLIDER TO CHANGE COLOR</Animatable.Text>
                </View>
                <View style={styles.footer}>
                    <Animatable.Text style={styles.footertext} iterationCount={100} animation="bounceInLeft"  duration={1500} direction="alternate">MADE</Animatable.Text>
                    <Animatable.Text style={styles.footertext} iterationCount={100} animation="bounceInUp" duration={1500} direction="alternate">WITH</Animatable.Text>
                <Animatable.Image 
                source = {Love}
                style={{ width: 23, height: 23}}
                animation="bounceInUp" direction="alternate" duration={1500} iterationCount={100}
                /> 
                <Animatable.Text style={styles.footertext} duration={1500} iterationCount={100} animation="bounceInRight"  direction="alternate">AT</Animatable.Text>

                <Animatable.Image source = {GeekyAnts}
                style={{  width: 23, height: 23 }}
                animation="bounceInRight" iterationCount={100} duration={1500} direction="alternate"
                />
                </View>
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
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
    },
    footertext: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
    },
    helptext: {
        color: 'white',
        fontSize: 17,
        fontWeight: "500",
    },
    box: {
        marginTop: 10,
        width: 100,
        height: 100,
    },
    time: {
        color: 'white',
        fontSize: 25,
        fontWeight: "800",
    },
    help: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    footer: {
        display: 'flex',
        flexDirection:'row',
        marginTop: 20,
        flex: 1,
        justifyContent:'space-between',
        alignItems: 'center',
        width: '60%',
    },
});
