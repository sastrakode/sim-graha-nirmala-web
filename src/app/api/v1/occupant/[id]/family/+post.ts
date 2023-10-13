import { errorDefinition } from "@/lib/constants"
import { familySchema } from "@/lib/schema"
import { db } from "@/server/db"
import { Family, Occupant, TInsertFamily } from "@/server/db/schema"
import { toFamilyResponse } from "@/server/models/responses/family"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"

const Param = familySchema

export const POST = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, {
      staff: ["admin", "secretary"],
      occupant: true,
    })
    const param = await bindJson(req, Param)

    const occupant = await db().query.Occupant.findFirst({
      where: eq(Occupant.id, params.id),
    })
    if (!occupant) return sendErrors(404, errorDefinition.occupant_not_found)

    const family: TInsertFamily = {
      occupantId: occupant.id,
      name: param.name,
      identityNumber: param.identity_number,
      birthday: new Date(param.birthday),
      gender: param.gender,
      birthplace: param.birthplace,
      religion: param.religion,
      education: param.education,
      job_type: param.job_type,
      maritalStatus: param.marital_status,
      relationshipStatus: param.relationship_status,
      fatherName: param.father_name,
      motherName: param.mother_name,
    }

    const [newFamily] = await db().insert(Family).values(family).returning()
    return sendData(201, toFamilyResponse(newFamily))
  },
)
