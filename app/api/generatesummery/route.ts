import openai from "@/openai";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    //  todos in the body of the POST req
    const body = await request.json();
    const { todos } = body;

    //  Communicate with openAI GPT
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content: `When responding, welcome the user always as Mr.Rashad Stack and say welcome to the Rashad stack Todo App! Limit the response to 200 characters.`,
        },
        {
          role: "user",
          content: `Hi there, provide a summery of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell her user to have a productive day! Her's the data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    });

    const { data } = response;

    return NextResponse.json(data.choices[0].message);
  } catch (e) {
    return NextResponse.json(
      { message: "Server error. please try again!", error: e },
      { status: 500 }
    );
  }
}
