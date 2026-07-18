import TelegramBot from 'node-telegram-bot-api';

export interface DatePlanFormData {
  preferredLocation: string;
  customLocation: string;
  preferredDate: string;
  preferredTime: string;
  selectedActivities: string[];
  extraNotes: string;
}
export interface TelegramPayload {
  uuid: string;
  receiverName: string;
  formData: DatePlanFormData;
  submittedAt: string;
}

function buildTelegramMessage(payload: TelegramPayload): string {
  const { receiverName, formData, submittedAt } = payload;

  const activitiesList =
    formData.selectedActivities.length > 0
      ? formData.selectedActivities.map((a) => `  • ${a}`).join("\n")
      : "  • No preference";

  const location =
    formData.customLocation.trim() || formData.preferredLocation;

  return [
    `💌 *Date Response from ${receiverName}!*`,
    ``,
    `📍 *Where:* ${location}`,
    `📅 *When:* ${formData.preferredDate}`,
    `⏰ *Time:* ${formData.preferredTime}`,
    ``,
    `🎉 *Activities she'd love:*`,
    activitiesList,
    ``,
    formData.extraNotes
      ? `💬 *Extra notes:*\n  "${formData.extraNotes}"`
      : ``,
    ``,
    `🕐 _Submitted at ${submittedAt}_`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

/**
 * Sends a message through the Telegram Bot API.
 * Credentials are read server-side only — never exposed to the client.
 */
export async function sendDateResponseViaTelegram(
  payload: TelegramPayload,
  botToken: string,
  chatId: string
): Promise<void> {
  const bot = new TelegramBot(botToken || '', { polling: false });
  if (!botToken || !chatId) {
    throw new Error(
      "Telegram credentials are missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env.local file."
    );
  }

  const message = buildTelegramMessage(payload);
  try {
    await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Telegram API error : ${error.message}`);
    }
    throw new Error(`An unknown error occurred`);
  }
}