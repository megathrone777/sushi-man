import { TelegramClient } from 'messaging-api-telegram';

const accessToken = 'AAHY1FPlgWls7tt5b5PSD1q9MkQ2IoahtXc';
const chatId = '-727652121';

const tg = new TelegramClient({ accessToken });

export default (message: string): void => {
  tg.sendMessage(chatId, message);
}
