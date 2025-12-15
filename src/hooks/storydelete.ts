'use client'

import { storyDelete } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => storyDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myorder'],
      })
    },
  })
}
