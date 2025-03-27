import { Platform, View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { use, useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import {CalendarDaysIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages, getWeatherMessage } from "../constants";
import * as Progress from 'react-native-progress';
import { storeData, getData } from "../utils/asyncStorage";


export default function HomeScreen() {
    const [locations, setLocations] = React.useState([]);
    const [weather, setWeather] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const handleLocation = (loc) => {
        //console.log('Location: ', loc);
        setLocations([]);
        setLoading(true);
        fetchWeatherForecast({
            cityName: loc.name,
            days: 7
        }).then(data => {
            setWeather(data);
            setLoading(false);
            storeData('city', loc.name);
          //console.log('Got Forecast:', data);
        });
    }

    const handleSearch = value => {
        if(value.length > 2) {
            fetchLocations({cityName: value}).then(data => {
                setLocations(data);
            });
        }
    }

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        let myCity = await getData('city');
        let cityName = 'Istanbul';
        if(myCity) cityName = myCity;

        fetchWeatherForecast({
            cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
        })
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const {current, location} = weather;

    const weatherCode = current?.condition?.code;
    const uvIndex = current?.uv;
    const temp = current?.temp_c;
    const rain = weather?.forecast?.forecastday[0]?.day?.daily_chance_of_rain;

    const { icon, message, bg } = getWeatherMessage(weatherCode, uvIndex, temp, rain);

    return (
        <KeyboardAvoidingView
            behavior={'height'}
            style={{ flex: 1 }}
        >
            <View className="flex-1 relative">
            <StatusBar style="dark" />
            <Image source={bg} blurRadius={50}  className="absolute w-full h-full bg-image"  />
           {/*  <View style={{backgroundColor: "#F8F3D9"}} className="absolute w-full h-full" />*/}
                {
                    loading? (
                        <View className="flex-1 flex-row justify-center items-center">
                            <Progress.CircleSnail thickness={10} color="#0bb3b2" size={140} />
                        </View>

                    ):(
                        <SafeAreaView className="flex flex-1 p-2 pt-12">
                            {/* Search Section */}
                            <View style={{height: '7%'}} className="mx-4 relative z-50 flex-row">
                                    <View className="flex-row justify-between items-center rounded-3xl w-full border-2" style={{height: "47" , borderColor: "#1E201E"}}>
                                        <TextInput
                                            onChangeText={handleTextDebounce}
                                            placeholder="Search City"
                                            placeholderTextColor={'#1E201E'} 
                                            className="text-lg text-black p-2 w-full"
                                        />
                                        <MagnifyingGlassIcon style={{position: "absolute", right: "10"}} size={"25"} color={"#1E201E"} />
                                    
                                    <View className="absolute w-full bg-gray-300 top-14 rounded-3xl">
                                        {
                                            locations.map((loc, index) => {
                                                let showBorder = index+1 !== locations.length;
                                                let borderClass = showBorder? " border-b border-gray-400": "";
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => handleLocation(loc)}
                                                        key={index}
                                                        className={"flex-row items-center border-0 p-3 px-4 mb-1"+borderClass}
                                                    >
                                                        <MapPinIcon size={20} color={"gray"} />
                                                        <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>  
                                </View>
                            </View>
                            
                            {/* Forecast Section */}
                            <View className="mx-4 flex justify-around flex-1 mb-2">
                                
                                {/* Weather Image 
                                <View className="flex-row justify-center">
                                    <Image source={weatherImages[current?.condition?.code]} style={{width: "250", height: "250", objectFit: "contain"}} />
                                </View>
                                */}

                                {/* Location */}
                                <Text className="text-center text-xl font-bold text-dark">
                                    {location?.name},
                                    <Text className="text-lg font-bold text-dark">
                                        {" "+location?.country}
                                    </Text>
                                </Text>

                                {/* Temperature */}
                                <View className="space-y-2 w-container" style={{ marginTop: -40}}>
                                    <Text className="text-center text-dark font-bold ml-5" style={{fontSize: 180,}}>
                                        {Math.round(current?.temp_c)}&#176;
                                    </Text>
                                    <Image source={weatherImages[current?.condition?.code]} className="w-icon"/>
                                    <Text className="text-center text-dark text-xl tracking-wide mt-10">
                                        {current?.condition?.text}
                                    </Text>
                                </View>
                                
                                {/* Warnings */}
                                <View className="flex-row gap-2 w-full p-3 rounded-2xl warning">
                                    <Text className="text-5xl text-center tracking-wide p-2">{icon}</Text>
                                    <Text className="text-center text-dark text-lg font-semibold tracking-wide" style={{width: "80%", flexWrap: "wrap"}}>{message}</Text>
                                </View>

                                {/* Weather Details */}
                                <View className="flex-row mx-4 justify-between">
                                    <View className="gap-2 items-center">
                                        <Text>Wind Speed</Text>
                                        <View className="flex-row">
                                            <Image source={require("../assets/icons/wind.png")} className="w-6 h-6" />
                                            <Text className="font-semibold text-base text-dark ml-2"> 
                                            {current?.wind_kph} km/h
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View className="gap-2 items-center">
                                        <Text>Humidity</Text>
                                        <View className="flex-row">
                                            <Image source={require("../assets/icons/drop.png")} className="w-6 h-6" />
                                            <Text className="font-semibold text-base text-dark ml-2"> 
                                            {current?.humidity}%
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View className="gap-2 items-center">
                                        <Text>Sunrise</Text>
                                        <View className="flex-row">
                                            <Image source={require("../assets/icons/sun.png")} className="w-6 h-6" />
                                            <Text className="font-semibold text-base text-dark ml-2"> 
                                                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        
                            {/* Forecast For Next Day */}
                            <View className="mb-2 space-y-3">
                                <View className="flex-row items-center mx-5 mb-3 space-x-2 gap-2">
                                    <CalendarDaysIcon size={22} color={"#2C2C2C"} />
                                    <Text className="text-base text-dark"> 
                                    Daily Forecast
                                    </Text>
                                </View>
                                <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>

                                    {
                                        weather?.forecast?.forecastday?.map((item, index)=>{
                                            let date = new Date(item.date);
                                            let options = {weekday: 'long'};
                                            let dayName = date.toLocaleDateString('en-US', options);
                                            dayName = dayName.split(',')[0];


                                            return(
                                                <View key={index} className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
                                                    <Image source={weatherImages[item?.day?.condition?.code]} className="w-11 h-11"/>
                                                    <Text className="text-dark">{dayName}</Text>
                                                    <Text className="text-xl font-semibold text-dark">
                                                        {Math.round(item?.day?.avgtemp_c)}&#176;
                                                    </Text>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    )
                }
            </View>
        </KeyboardAvoidingView>       
    );
}

const styles = StyleSheet.create({
    maskedView: {
      width: 300,
      height: 100,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    maskedText: {
      fontSize: 80,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    videoContainer: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    video: {
      width: '100%',
      height: '100%',
    },
  });
  