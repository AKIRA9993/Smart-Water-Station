"use client"

import * as React from "react"
import { Button } from "../../../_components/ui/button"
import { Input } from "../../../_components/ui/input"
import { Textarea } from "../../../_components/ui/textarea"
import { Label } from "../../../_components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/_components/ui/drawer"

export function DrawerDemo({ open, onOpenChange }: {
  open: boolean,
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  function handleSubmit() {
    console.log({ name, email, message })
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} >
      <DrawerContent className="bg-[#6f8aba]">
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader>
            <DrawerTitle className="text-[#456DAE]">Contact Us</DrawerTitle>
            <DrawerDescription>Send us a message and we'll get back to you.</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <DrawerFooter>
            <Button
              className="bg-[#456DAE] text-white hover:bg-[#3a5d9a]"
              onClick={handleSubmit}
            >
              Send Message
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}