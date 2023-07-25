import { getUserOrganizedWorkshops } from "@/app/_actions/workshop"
import { Button } from "@/components/ui/button"
import { formatDateInDDMMYYYY } from "@/lib/utils/format-date"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

async function Organized() {
  const workshops = await getUserOrganizedWorkshops()

  return (
    <main className="basis-[80%]">
      <h1 className="font-archivo font-medium text-[#333] text-4xl p-20 border-b border-[#333]">
        Welcome to HiGrow. Dashboard.
      </h1>
      <div className="py-12 px-20">
        <div className="space-y-8">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-3xl font-archivo text-secondary">
              Organized Opportunities
            </h1>
            <Link href="/dashboard/all-workshops">
              <Button variant={"outline"}>See All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {workshops &&
              workshops.map((workshop, index) => (
                <div
                  key={index}
                  className="flex w-full py-4 px-4 items-center border border-input bg-background rounded-md divide-x-2 divide-input"
                >
                  <span className="px-4">{`0${index + 1}.`}</span>
                  <h2 className="text-lg px-4 grow-[3] truncate">
                    {workshop.name} by {workshop.instructor_name}
                  </h2>
                  <span className="px-4 shrink-0">{`${formatDateInDDMMYYYY(
                    workshop.application_closing_date
                  )}`}</span>
                  <span className="text-primary-lighter text-center shrink-0 grow-[2] font-semibold px-4">
                    Accepting applications
                  </span>
                  <Link
                    className="px-4"
                    href={`/dashboard/manage-workshop/${workshop.id}/announcements`}
                  >
                    <Button variant={"outline"}>
                      Details
                      <ChevronRight className="text-secondary w-6 h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Organized