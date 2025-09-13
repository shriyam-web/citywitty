// app/api/geocode/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!lat || !lng) {
        return NextResponse.json({ error: "Latitude and longitude required" }, { status: 400 });
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_KEY; // ✅ backend-only
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );
        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch geocode" }, { status: 500 });
    }
}
