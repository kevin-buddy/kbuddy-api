import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    // Optional: Parse query parameters if you want to make the query dynamic
    // Example: /api/projects?limit=5
    // const { searchParams } = new URL(request.url);
    // const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    try {
        const { data, error } = await supabase
            .from('personal_project_inaggre_brands')
            .select('*');

        if (error) {
            console.error('Supabase error:', error.message);
            return NextResponse.json(
                { error: 'Failed to fetch data from database.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}