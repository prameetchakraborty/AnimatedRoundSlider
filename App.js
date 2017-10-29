import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedSlider from './src/AnimatedSlider';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAngle: null,
      angleLength: null,
    };
  }
  render() {
    return (
      <View style={styles.container}>
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
          bgCircleColor="#171717"/>
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
