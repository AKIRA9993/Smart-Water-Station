"use client"
import React, { useState } from 'react'
import PageHeader from "@/_components/fixed-components/PageHeader/PageHeader"
import {
  Field,
  FieldContent,
  FieldLabel,
} from "../../../_components/ui/field"
import { Switch } from "../../../_components/ui/switch"
import { Power, ClockAlert, ListFilter } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from "../../../_components/ui/toggle-group"
import { Card, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card'
import { Badge } from '@/_components/ui/badge'
import { Separator } from '@/_components/ui/separator'

export default function Control() {
  const [isOn, setIsOn] = useState(false)
  const [mode, setMode] = useState("ai")

  return (
    <>
      <PageHeader />
      <div className="px-4 sm:px-10 lg:px-20">

      {/* header */}
      <div className="mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold pb-2 text-[#456DAE]">
          Main Pump Control
        </h1>
        <p className="text-[#456DAE] text-sm sm:text-base">
          Real-time over all water treatment plant sensors
        </p>
      </div>
      

      {/* header banners */}
      <div className="mt-4 flex flex-col gap-4">

        {/* notification banner */}
        <div className="bg-[#F9E8E8] border border-red-200 rounded-md px-4 py-3 text-red-600 text-sm font-medium">
          ⚠️ Warning: Water Pressure is above safe level!
        </div>

        {/* power switch */}
        <div className="bg-white border border-blue-300 rounded-md px-4 py-4 text-[#456DAE] text-sm">
          <Field orientation="horizontal" className="w-full">
            <FieldContent>
              <FieldLabel htmlFor="switch-pump" className="flex items-center gap-2 text-[#456DAE] font-semibold">
                <Power className="h-4 w-4" />
                {isOn ? "Stop Pump" : "Start Pump"}
              </FieldLabel>
            </FieldContent>
            <Switch
              id="switch-pump"
              checked={isOn}
              onCheckedChange={setIsOn}
              className="data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-[#456DAE] rounded-full transition-colors duration-200 [&>span]:rounded-full [&>span]:shadow-md [&>span]:transition-transform [&>span]:duration-200"
            />
          </Field>
        </div>
      </div>
<Separator className="my-6 bg-blue-950"/>
      {/* operation mode */}
      <div className="mt-8">
        <h3 className="text-2xl sm:text-3xl font-bold pb-2 text-[#456DAE]">
          Operation Mode
        </h3>

        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(val) => val && setMode(val)}
          className="bg-[#DDE3EF] rounded-xl p-1 w-full mt-4 flex"
        >
          <ToggleGroupItem
            value="manual"
            className="flex-1 rounded-lg text-[#456DAE] font-semibold data-[state=on]:bg-white data-[state=on]:shadow-sm"
          >
            Manual
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ai"
            className="flex-1 rounded-lg text-[#456DAE] font-semibold data-[state=on]:bg-white data-[state=on]:shadow-sm"
          >
            AI Mode
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pb-25">

        {/* pressure card */}
        <Card className="w-full px-4 sm:px-8 py-6 bg-[#F9F9F9] pb-15">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#456DAE]">
              <ClockAlert className="h-4 w-4" /> Water Pressure
            </CardTitle>
            <CardDescription className="text-[#456DAE] mt-2">
              Representing the current water pressure in PSI
            </CardDescription>
          </CardHeader>
        </Card>

        {/* filter card */}
        <Card className="w-full px-4 sm:px-8 py-6 bg-[#F9F9F9]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#456DAE]">
              <ListFilter className="h-4 w-4" /> Filter Status
            </CardTitle>
            <CardDescription className="mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border border-green-300">
                Active
              </Badge>
            </CardDescription>
          </CardHeader>
        </Card>

      </div>

      </div>
    </>
  )
}