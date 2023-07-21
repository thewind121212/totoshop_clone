import { getPopularProduct } from '@/utils/firebase/getProduct.firebase'

import { NextResponse } from 'next/server'
 
export async function GET() {
    const data = await getPopularProduct() 
     return NextResponse.json(data, 
     {
      status: 200,
      headers: {  
        'Content-Type': 'application/json',
      },
     }
  )
}