import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const expectedToken = process.env.AUTH_TOKEN;

        // Check if the header exists and matches "Bearer <YOUR_TOKEN>"
        if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
            return NextResponse.json(
                { error: 'Unauthorized access.' },
                { status: 401 }
            );
        }
        const uuid = process.env.DEFAULT_UUID as string;
        const { data, error } = await supabase
            .from('personal_project_buttonofdestiny')
            .select('*')
            .eq('uuid', uuid)
            .single();

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