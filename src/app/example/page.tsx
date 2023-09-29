"use client"

import { LoadingButton } from "@/components/ui/button"
import { DateInput } from "@/components/ui/date-input"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Resolver, useForm } from "react-hook-form"

type FormSchema = {
  familyCard: FileList
}

export default function ExamplePage() {
  const resolver: Resolver<FormSchema> = async (values) => {
    return {
      values: values.familyCard.length > 0 ? values : {},
      errors:
        values.familyCard.length === 0
          ? {
              familyCard: {
                type: "required",
                message: "Kartu Keluarga harus diisi",
              },
            }
          : {},
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({ resolver })

  function test() {
    // return promise that resolves after 2 seconds
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  async function onSubmit(data: FormSchema) {
    await test()
  }

  return (
    <div className="m-4 w-fit">
      <DateInput
        onChange={(date) => {
          console.log(date)
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <Label
            className={errors.familyCard && "text-destructive"}
            htmlFor="categoryName"
          >
            File Kartu Keluarga
          </Label>
          <Input type="file" {...register("familyCard")} />
          {errors.familyCard && (
            <p className={`text-sm font-medium text-destructive`}>
              {errors.familyCard.message}
            </p>
          )}
        </div>

        <LoadingButton loading={isSubmitting} type="submit">
          Upload
        </LoadingButton>
      </form>
    </div>
  )
}
