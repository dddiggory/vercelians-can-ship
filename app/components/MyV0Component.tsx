/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2lFFKpMdPx4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-purple-500 to-pink-500 bg-cover bg-center">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-semibold text-white">22°</div>
          <div className="text-sm font-medium text-white">Partly cloudy</div>
        </div>
      </CardContent>
      <CardFooter className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <MapIcon className="h-4 w-4" />
          <span>San Francisco</span>
        </div>
        <Button className="text-white" size="sm" variant="ghost">
          More info
        </Button>
      </CardFooter>
      <CardContent className="p-4">
        <div className="text-sm text-white">Humidity: 65%</div>
        <div className="text-sm text-white">Wind: 10 mph</div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <CalendarIcon className="h-4 w-4" />
          <span>Today</span>
        </div>
        <Button className="text-white" size="sm" variant="ghost">
          Weekly forecast
        </Button>
      </CardFooter>
    </Card>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function MapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}
