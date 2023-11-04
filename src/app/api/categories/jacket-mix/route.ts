
import { NextResponse } from "next/server"




export async function GET() {
    try {
        const dataFetching = await fetch(`http://192.168.0.253:4000/categories/mix-jacket`)
        const data = await dataFetching.json()
        return NextResponse.json(data,
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

    } catch (error) {
        return NextResponse.json('some thing went wrong',
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}