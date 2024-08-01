import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectPri() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select language</SelectLabel>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
          <SelectItem value="Chinese">Chinese</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
