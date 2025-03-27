export const apiKey = '{* YOUR API KEY HERE *}';

export const weatherImages = {
    '1000': require('../assets/images/sun.png'),
    '1003': require('../assets/images/partlycloudy.png'),
    '1006': require('../assets/images/cloud.png'),
    '1009': require('../assets/images/cloud.png'),
    '1030' : require('../assets/images/mist.png'),
    '1135' : require('../assets/images/mist.png'),
    '1183' : require('../assets/images/moderaterain.png'),
    '1186' : require('../assets/images/moderaterain.png'),
    '1189' : require('../assets/images/moderaterain.png'),
    '1198' : require('../assets/images/moderaterain.png'),
    '1063': require('../assets/images/moderaterain.png'),
    '1066': require('../assets/images/moderaterain.png'),
    '1069': require('../assets/images/moderaterain.png'),
    '1240': require('../assets/images/moderaterain.png'),
    '1192': require('../assets/images/heavyrain.png'),
    '1195': require('../assets/images/heavyrain.png'),
    '1201': require('../assets/images/heavyrain.png'),
    '1243': require('../assets/images/heavyrain.png'),
    '1276': require('../assets/images/heavyrain.png'),
    '1213': require('../assets/images/lightsnow.png'),
    '1219': require('../assets/images/lightsnow.png'),
    '1258': require('../assets/images/lightsnow.png'),
    '1225': require('../assets/images/snow.png'),
    '1237': require('../assets/images/snow.png'),
};

export const getWeatherMessage = (weatherCode, uvIndex, temp, rain, bg) => {
    const weatherMessages = {
        '1000': {
            icon: "☀️",
            message: uvIndex > 5 
                ? "Don't forget to apply sunscreen before leaving the house!" 
                : "The weather is clear, a beautiful day awaits you!",
            bg: require("../assets/images/bg-sun.png"),
        },
        '1003': {
            icon: "🌤",
            message: rain > 50 || temp < 20  
                ? "It may be a little chilly or rainy, so be careful." 
                : "It's slightly cloudy, enjoy!",
            bg: require("../assets/images/bg-ps.png"),
        },
        '1006':{
            icon: "☁️",
            message: "Cloudy weather prevails, maybe a coffee break would be good?"
        },
        '1009': {
            icon: "☁️",
            message: "Cloudy weather prevails, maybe a coffee break would be good?",
            bg: require("../assets/images/bg-cloudy.png")
        },
        '1030': {
            icon: "🌫",
            message: "It is foggy, visibility may be low. Be careful!",
            bg: require("../assets/images/bg-mist.png")
        },
        '1135': {
            icon: "🌫",
            message: "It is foggy, visibility may be low. Be careful!",
            bg: require("../assets/images/bg-mist.png")
        },
        '1183': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1186': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1189': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1198': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1063': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1066': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1069': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1240': {
            icon: "🌧",
            message: "Light rain is expected, bring your umbrella!",
            bg: require("../assets/images/bg-rain.png")
        },
        '1192': {
            icon: "⛈",
            message: "There is heavy rain, wear waterproof clothing when going out!",
            bg: require("../assets/images/bg-heavy-rain.png")
        }, 
        '1195': {
            icon: "⛈",
            message: "There is heavy rain, wear waterproof clothing when going out!",
            bg: require("../assets/images/bg-heavy-rain.png")
        },
        '1201': {
            icon: "⛈",
            message: "There is heavy rain, wear waterproof clothing when going out!",
            bg: require("../assets/images/bg-heavy-rain.png")
        },
        '1243': {
            icon: "⛈",
            message: "There is heavy rain, wear waterproof clothing when going out!",
            bg: require("../assets/images/bg-heavy-rain.png")
        },
        '1276': {
            icon: "⛈",
            message: "There is heavy rain, wear waterproof clothing when going out!",
            bg: require("../assets/images/bg-heavy-rain.png")
        },
        '1213': {
            icon: "❄️",
            message: "There is heavy snow, wear warm and waterproof clothing when going out!",
            bg: require("../assets/images/bg-light-snow.png")
        },
        '1219': {
            icon: "❄️",
            message: "There is heavy snow, wear warm and waterproof clothing when going out!",
            bg: require("../assets/images/bg-light-snow.png")
        },
        '1258': {
            icon: "❄️",
            message: "There is heavy snow, wear warm and waterproof clothing when going out!",
            bg: require("../assets/images/bg-light-snow.png")
        },
        '1225': {
            icon: "❄️",
            message: "There is heavy snow, wear warm and waterproof clothing when going out!",
            bg: require("../assets/images/bg-snow.png")
        },
        '1237': {
            icon: "❄️",
            message: "There is heavy snow, wear warm and waterproof clothing when going out!",
            bg: require("../assets/images/bg-snow.png")
        },
        
    };

    return weatherMessages[weatherCode] || { icon: "❓", message: "Weather forecast is unknown, but be prepared!" };
};
