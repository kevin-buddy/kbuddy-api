import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { sendDateResponseViaTelegram, TelegramPayload } from '@/app/lib/telegram';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
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

        const uuid = (await params).uuid;
        const { data, error } = await supabase
            .from('personal_project_buttonofdestiny')
            .select('*')
            .eq('uuid', uuid)
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

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
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
        const payload = await request.formData();
        const jsonObject = Object.fromEntries(payload.entries());
        const { data, error } = await supabase
            .from('personal_project_buttonofdestiny')
            .select('*')
            .eq('uuid', jsonObject.uuid)
            .single();

        // 5. Handle Supabase errors
        if (error) {
            console.error('Supabase error:', error.message);
            return NextResponse.json(
                { error: 'Failed to fetch data from database.' },
                { status: 500 }
            );
        }
        await sendDateResponseViaTelegram(jsonObject as unknown as TelegramPayload, data.TELEGRAM_BOT_TOKEN, data.TELEGRAM_CHAT_ID);
        return NextResponse.json({ success: true, message: "Telegram message has been sent." }, { status: 200 });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}