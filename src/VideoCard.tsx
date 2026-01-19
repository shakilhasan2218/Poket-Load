import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Video } from '../lib/videoData';

interface VideoCardProps {
  video: Video;
  onPress: () => void;
  isWatched?: boolean;
}

export default function VideoCard({ video, onPress, isWatched = false }: VideoCardProps) {
  const { t, language } = useApp();
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, isWatched && styles.watchedContainer]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: video.thumbnailUrl }} 
          style={styles.thumbnail}
          resizeMode="cover"
        />
        
        {/* Duration badge */}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
        </View>
        
        {/* Points badge */}
        <View style={styles.pointsBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.pointsText}>+{video.points}</Text>
        </View>
        
        {/* Play overlay */}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#fff" />
          </View>
        </View>
        
        {/* Watched overlay */}
        {isWatched && (
          <View style={styles.watchedOverlay}>
            <Ionicons name="checkmark-circle" size={40} color="#4ECDC4" />
            <Text style={styles.watchedText}>{t('completed')}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {language === 'bn' ? video.titleBn : video.title}
        </Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="eye-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{formatViews(video.views)}</Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{video.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  watchedContainer: {
    opacity: 0.7,
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pointsBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(108,60,231,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pointsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(108,60,231,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  watchedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    gap: 8,
  },
  watchedText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '700',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
});
