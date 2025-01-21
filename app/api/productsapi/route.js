// api routs for crud operation here 

const { connectionSRT } = require("@/app/lib/d");
const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(request){

    const uri=connectionSRT
const client=new MongoClient(uri)
try{
    const database = client.db('stock')
    const inventory = database.collection('inventory')

    const query={}
    const allproducts= await inventory.find(query).toArry()
    console.log(allproducts);
    return NextResponse.json({allproducts})

}
finally{
    await client.close()
}
}
