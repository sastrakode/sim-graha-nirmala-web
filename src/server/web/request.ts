import { z } from "zod"

export async function bindJson<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
): Promise<z.infer<T>> {
  let body = await req.json()
  return schema.parse(body)
}
