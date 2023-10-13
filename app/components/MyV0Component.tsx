/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9YE2zTtqZKB
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card key="1" className="mx-auto max-w-md bg-green-200 border-dashed border-green-500">
      <CardHeader>
        <CardTitle className="text-xl text-green-800 animate-bounce duration-2000">Guestbook</CardTitle>
        <CardDescription className="text-green-600">Leave a message for us before you go</CardDescription>
      </CardHeader>
      <CardContent className="bg-green-100">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-green-600" htmlFor="first-name">
                Name
              </Label>
              <Input className="bg-green-50 text-green-700" id="first-name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label className="text-green-600" htmlFor="email">
                Email
              </Label>
              <Input className="bg-green-50 text-green-700" id="email" placeholder="Your Email" required type="email" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-green-600" htmlFor="message">
              Message
            </Label>
            <Textarea
              className="min-h-[100px] bg-green-50 text-green-700"
              id="message"
              placeholder="Leave a nice message"
              required
            />
          </div>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white animate-pulse border-2 border-green-700"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
