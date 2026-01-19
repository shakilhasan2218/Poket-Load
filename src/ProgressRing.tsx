import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export default function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  color = '#6C3CE7',
  backgroundColor = 'rgba(108,60,231,0.2)',
  showPercentage = true,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  
  // Create segments for the progress ring using View elements
  const segments = 36;
  const activeSegments = Math.floor(progress * segments);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background ring */}
      <View style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: backgroundColor,
        }
      ]} />
      
      {/* Progress ring - simplified version using border */}
      <View style={[
        styles.progressRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: 'transparent',
          borderTopColor: progress > 0 ? color : 'transparent',
          borderRightColor: progress > 0.25 ? color : 'transparent',
          borderBottomColor: progress > 0.5 ? color : 'transparent',
          borderLeftColor: progress > 0.75 ? color : 'transparent',
          transform: [{ rotate: '-90deg' }],
        }
      ]} />
      
      {/* Content */}
      <View style={styles.content}>
        {children || (showPercentage && (
          <Text style={[styles.percentage, { color }]}>
            {Math.round(progress * 100)}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
  },
  progressRing: {
    position: 'absolute',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 16,
    fontWeight: '700',
  },
});
