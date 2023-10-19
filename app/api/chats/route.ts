import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// id, senderId, message

// sender is the person who is currently logged in or the selected User

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const { searchParams } = new URL(request.url);

  const secondUser = searchParams.get("userId") || "";

  const chats = [
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
    { id: "dfakljds", senderId: email, message: "Hello Samarpan" },
    { id: "dfew9ikh", senderId: secondUser, message: "Hello Sanjeev" },
    { id: "dfkasdfj", senderId: email, message: "How are you these days" },
    {
      id: "dfkasdfj",
      senderId: secondUser,
      message: "I'm fine, what about you?",
    },
  ];

  await new Promise((res) => setTimeout(res, 3000));

  return NextResponse.json({ chats });
}
