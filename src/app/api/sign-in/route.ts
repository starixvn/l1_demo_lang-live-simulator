import { NextResponse } from "next/server";
import configs from "../../../../configs";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const browserUserAgent = request.headers.get("user-agent");
    const { playerId, gameId, language, currency, operatorId, operatorSecret } =
      body;

    const randomPlayerId = Math.floor(Math.random() * 10000000).toString();
    const id = playerId || randomPlayerId;
    const params = {
      seq: "d,y,lumi",
      siteId: "4100300",
      domain: "example.com",
      browserUserAgent,
      currency: currency || "UUS",
      language: language || "en-US",
      ip: "0",
      playerId: id,
      playerName: `username_${id}`,
      gameId: gameId || 134,
      appType: 9,
      siteName: "DemoLanglive",
      auth: {
        operatorId: operatorId || "ONEworksVGCash",
        operatorSecret: operatorSecret || "VG@SC123",
      },
      operatorToken: "PFFToken",
      isCash: true,
    };

    // Validate the incoming configuration
    const responseBalance = await axios.post(
      `${configs.owApiUrl}/SetDefaultBalance?playerId=${id}&operator=ow&balance=20000&siteId=4100300`
    );
    if (responseBalance.status !== 200) {
      return;
    }
    const responseSSO = await axios.post(
      `${configs.simulatorUrl}/signin/sso`,
      params
    );
    return NextResponse.json(responseSSO.data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
