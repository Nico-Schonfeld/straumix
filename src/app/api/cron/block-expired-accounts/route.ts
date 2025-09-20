import { NextRequest, NextResponse } from "next/server";
import { blockExpiredUnverifiedAccounts } from "@/app/actions/auth/verificationActions";

export async function POST(request: NextRequest) {
  try {
    // Verificar que sea una llamada autorizada (opcional: agregar API key)
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CRON_SECRET || "default-secret";

    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await blockExpiredUnverifiedAccounts();

    return NextResponse.json({
      success: result.success,
      message: result.message,
      blockedAccounts: result.blockedAccounts || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en cron job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// También permitir GET para testing
export async function GET() {
  try {
    const result = await blockExpiredUnverifiedAccounts();

    return NextResponse.json({
      success: result.success,
      message: result.message,
      blockedAccounts: result.blockedAccounts || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en cron job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
