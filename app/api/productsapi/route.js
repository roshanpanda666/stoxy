const { connectionSRT } = require("@/app/lib/d");
const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(request) {
    const uri = connectionSRT;
    const client = new MongoClient(uri);

    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const allProducts = await inventory.find({}).toArray();

        console.log("Fetched products:", allProducts);

        // Return success and result structure
        return NextResponse.json({ success: true, result: allProducts });

    } catch (error) {
        console.error("Error in GET:", error);

        // Return error response
        return NextResponse.json({ success: false, message: "Failed to fetch products" });
    } finally {
        await client.close();
    }
}

export async function POST(request) { 
    const body = await request.json();

    const uri = connectionSRT;
    const client = new MongoClient(uri);

    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const product = await inventory.insertOne(body);

        console.log("Inserted product:", product);

        // Return success response
        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error("Error in POST:", error);

        // Return error response
        return NextResponse.json({ success: false, message: "Failed to add product" });
    } finally {
        await client.close();
    }
}

