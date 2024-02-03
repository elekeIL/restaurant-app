import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import {
    addRestaurants,
    deleteRestaurantRecord,
    getRestaurants,
    Restaurant,
    searchRestaurants,
    updateRestaurantRecord
} from "@/lib/data";
import * as url from "url";

export const GET = async (req: Request, res: NextApiResponse) => {

    const queryParams = url.parse(req.url, true).query;

    if (!queryParams) {
        const restaurants = searchRestaurants();
        return NextResponse.json({message: "Success", restaurants}, {status: 200});
    }

    const { city, latitude, longitude, distance } = queryParams;
    if (!city) {
        return NextResponse.json({message: "City is required for searching restaurants."}, {status: 400});
    }

    if (!latitude || !longitude) {
        return NextResponse.json({message: "Latitude and longitude are required for searching restaurants."}, {status: 400});
    }

    const userLatitude = parseFloat(latitude as string);
    const userLongitude = parseFloat(longitude as string);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return NextResponse.json({message: "Invalid latitude or longitude values."}, {status: 400});
    }
    if (distance !== undefined && (isNaN(parseFloat(distance as string)) || parseFloat(distance as string) < 0)) {
        return NextResponse.json({message: "Distance must be a non-negative number."}, {status: 400});
    }

    const restaurants = searchRestaurants(city, latitude, longitude, distance)
    return NextResponse.json({message: "Success", restaurants}, {status: 200});


};


export const POST = async (req: Request, res: Response) => {

    const newRestaurant: Restaurant = await req.json();
    if (!newRestaurant.name || !newRestaurant.address || !newRestaurant.latitude || !newRestaurant.longitude) {
        return NextResponse.json({message: "All fields (name, address, latitude and longitude) are required for creating a new restaurant.",  status: 400});
    }
    try{
        addRestaurants(newRestaurant);
        return NextResponse.json({message: "Added", newRestaurant}, { status: 201});
    } catch (err){

        return NextResponse.json({ message: "Error", error: "Restaurant with the same name already exists."}, {status: 500 });

    }
};


export const PUT = async (req: Request, res: Response) => {
    const {id} = url.parse(req.url, true).query;

    if (!id) {
        return NextResponse.json({message: "Error", error: "Id must be provided"}, {status: 400});
    }

    const updatedRestaurant: Restaurant = await req.json();

    try {
        updateRestaurantRecord(id as string, updatedRestaurant)
        return NextResponse.json({message: "Updated", updatedRestaurant}, {status: 201});
    } catch (err) {

        return NextResponse.json({
            message: "Error",
            error: "An error occurred when trying to update restaurant record"
        }, {status: 500});

    }
}
export const DELETE = async (req: Request, res: Response) => {

    const {id} = url.parse(req.url, true).query;

    if (!id) {
        return NextResponse.json({message: "Error", error: "Id must be provided"}, {status: 400});
    }

    try {
        deleteRestaurantRecord(id as string)
        return NextResponse.json({message: "Deleted"}, {status: 200});
    } catch (err) {

        return NextResponse.json({
            message: "Error",
            error: "An error occurred when trying to delete restaurant record"
        }, {status: 500});

    }
}


function isValidCity(city: string): boolean {

    return true;
}

function isValidCoordinates(latitude: any, longitude: any): boolean {
    return true;
}

function isValidDistance(distance: any): boolean {

    return distance !== undefined && parseFloat(distance) >= 0;
}