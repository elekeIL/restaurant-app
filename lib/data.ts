export interface Restaurant {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    cuisineType?: string;
    priceRange?: string;
    ratings?: string
}

let restaurantsData: Restaurant[] = [
    {   id: "1",
        name: "Restaurant A",
        address: "123 Main Street, CityName",
        latitude: 12.350000,
        longitude: -45.670000,
    },
    {   id: "2",
        name: "Restaurant B",
        address: "456 Oak Avenue, CityName",
        latitude: 12.355000,
        longitude: -45.675000
    },
    {   id: "3",
        name: "Cafe Delight",
        address: "123 Main St, New York, NY",
        latitude: 40.7128,
        longitude: -74.0060
    }
];

export const getRestaurants = () => restaurantsData;

export const addRestaurants = (restaurant: Restaurant) => {
    const existingRestaurant = restaurantsData.find((r) => r.name.toLowerCase() === restaurant.name.toLowerCase());
    if (existingRestaurant) {
        throw new Error("Restaurant with the same name already exists.");
    }
    restaurant.id = generateRestaurantId();
    restaurantsData.push(restaurant);
};


export const deleteRestaurantRecord = (id: string) => {
    restaurantsData = restaurantsData.filter((restaurant)=> restaurant.id !== id);
}

export const updateRestaurantRecord = (id: string, updatedRestaurant: Partial<Restaurant>) => {
    const index = restaurantsData.findIndex((restaurant) => restaurant.id === id);
    if(index !== -1){
        restaurantsData[index] = {...restaurantsData[index], ...updatedRestaurant}
    }
}

export const getById = (id:string) => {
    return restaurantsData.find((restaurant)=> restaurant.id === id);
}

export const getByName = (id:string) => {
    return restaurantsData.find((restaurant)=> restaurant.name === restaurant.name);
}

export const searchRestaurants = (
    city?: string,
    latitude?: number,
    longitude?: number,
    distance?: number,
    name?: string
): Restaurant[] => {
    return restaurantsData.filter((restaurant) => {
        return (
            (!city || restaurant.address.toLowerCase().includes(city.toLowerCase())) &&
            (!latitude || restaurant.latitude === latitude) &&
            (!longitude || restaurant.longitude === longitude) &&
            (!name || restaurant.name.toLowerCase().includes(name.toLowerCase()))
        );
    });
};


export const generateRestaurantId = (): string => {
    const newId = Math.floor(Math.random() * 100).toString()
    console.log(newId)

    const isIdUnique = restaurantsData.every((restaurant) => restaurant.id !== newId);

    if (!isIdUnique) {
        return generateRestaurantId();
    }

    return newId;
};


function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

