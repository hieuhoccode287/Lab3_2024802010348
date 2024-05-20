import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import COLORS from '../../constants';

const parseTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate(); 
  return date.toLocaleString();
};



const ServicesDetail = () => {
  const route = useRoute();
  const { title, price, imageUrl, createdAt, finalUpdate } = route.params;

  console.log('Route Params:', route.params);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Service name: <Text style={styles.textNormal}>{title || 'N/A'}</Text>
      </Text>
      <Text style={styles.title}>
        Price: <Text style={styles.textNormal}>{price ? `${price} ₫` : 'N/A'}</Text>
      </Text>
      <Text style={styles.title}>
        Time: <Text style={styles.textNormal}>{parseTimestamp(createdAt)}</Text>
      </Text>
      <Text style={styles.title}>
        Final update: <Text style={styles.textNormal}>{parseTimestamp(finalUpdate)}</Text>
      </Text>
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  textNormal: {
    fontWeight: 'normal',
  },
});

export default ServicesDetail;
