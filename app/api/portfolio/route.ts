import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const expectedToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

        // Check if the header exists and matches "Bearer <YOUR_TOKEN>"
        if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
            return NextResponse.json(
                { error: 'Unauthorized access.' },
                { status: 401 }
            );
        }

        // Optional: Parse query parameters if you want to make the query dynamic
        // Example: /api/projects?limit=5
        // const { searchParams } = new URL(request.url);
        // const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;

        const { data, error } = await supabase
            .from('personal_project_portfolio')
            .select('*')
            .order('id', { ascending: true });

        // 5. Handle Supabase errors
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