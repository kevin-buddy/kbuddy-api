import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ brand_id: string }> }
) {
    try {
        const brand_id = (await params).brand_id;
        const { data, error } = await supabase
            .from('personal_project_inaggre_brands')
            .select('*')
            .eq('id', brand_id)
            .single();

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