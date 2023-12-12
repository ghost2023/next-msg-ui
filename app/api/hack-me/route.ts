import { FormDataToObject } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const session = { user: { id: "1" } };

  if (!session)
    return Response.json(
      { success: false, error: "Not Authorized" },
      { status: 403 },
    );

  const formData = await req.formData();

  const data = FormDataToObject(formData);

  const zodUserSchema = z.object({
    name: z.string(),
    description: z.string(),
    unlockAmount: z.coerce.number().min(1),
    awardAmount: z.coerce.number().min(1),
    type: z.enum(["solidity", "bytes", "rust", "bytes+solidity"]),
    chain: z.enum(["ethereum", "near", "solana", "cosmos"]),
    duration: z.coerce.number().min(600), // 10 minutes,
    address: z.string().optional(),
    file: z.custom<File>(),
  });

  const result = zodUserSchema.safeParse(data);

  if (!result.success) {
    return Response.json(
      { success: false, error: fromZodError(result.error) },
      { status: 400 },
    );
  }

  await prismaClient.challenge.create({
    data: {
      title: result.data.name,
      description: result.data.description,
      // unlockAmount: result.data.unlockAmount,
      amount: result.data.awardAmount,
      challengeType: result.data.type,
      // address: result.data.address,
      status: "ONQUEUE",
      chain: result.data.chain,
      duration: result.data.duration,
      codebase: "",
      difficulty_level: "EASY", // TODO
      creator: { connect: { id: session.user.id } },
    },
  });

  const file = result.data.file; // the file obj to be upload

  return Response.json({ success: true });
}
