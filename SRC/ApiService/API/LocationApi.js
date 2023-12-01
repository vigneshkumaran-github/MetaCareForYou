import axios from 'axios';

export const getUserLocationInfo = async () => {
try {
        const value = await getLocations();

        console.log(value)

        if (value !== null) {
            const url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + value.latitude + "&longitude=" + value.longitude
            const response = await axios.get(url);
            return response.data;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getLocations = async () => {
    try {
        const data = await AsyncStorage.getItem('location_details');

        // dev numbers
        // return {userId: '1539', mobile: '6384320081'};
        return JSON.parse(data);
    } catch {
        return null;
    }
};