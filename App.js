import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image , ScrollView, Dimensions } from 'react-native';

export default function App() {
  const {height,width} = Dimensions.get('screen')
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://www.omdbapi.com/?apikey=edcaa7a5&s=batman'); // Removed backticks
        const data = await res.json();
        console.log(data.Search);
        setMovies(data.Search);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{textAlign:'center',marginTop:60}}>{movies.length} Movies has found in list</Text>
        {movies.map((movie) => (
          <View  key={movie.imdbID} style={styles.moviesList}>
            <Image
            style={{width:200,height:200,display:'flex',alignItems:'center',objectFit:'cover',flexWrap:'wrap'}}
            source={{uri: movie.Poster}}/>
            <Text style={styles.Text}>{movie.Title}</Text>
          </View>
          ))}
        </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    color: 'gold',
    fontWeight:'bold',
    textShadowColor: '0 0 8px gold',
    marginVertical: 10
  },
  moviesList:{
    display:'flex',
    alignItems:'center',
    marginTop:40,
  }
});

