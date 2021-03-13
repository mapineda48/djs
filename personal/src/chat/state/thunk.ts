import http, { PostMessage } from "production/http";
import type { Chat } from ".";

export async function addMessage(chat: Chat, data: PostMessage) {
  try {
    await http.addMessage(data);
  } catch (error) {
    console.log(error);
    chat.addMessage({ content: "No se pudo enviar el mensaje." });
  }
}

export async function isOnline(chat: Chat, id: string) {
  try {
    const data = await http.isOnline({ room: id });

    chat.setOnline(data);
  } catch (error) {
    console.log(error);
  }
}
