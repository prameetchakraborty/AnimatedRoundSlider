import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnimatedSlider from './AnimatedSlider';
import Love from '../images/love_icon.png';
import GeekyAnts from '../images/geekyants.png';

export default class App extends React.Component {
    state = {
        startAngle: Math.PI * 10 / 6,
        angleLength: Math.PI * 7 / 6,
    }
    
    render() {
        const { startAngle, angleLength } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.slider}>
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
    slider: {
        marginTop: 40,
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
