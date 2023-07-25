import "./workshops.scss"
import { getWorkshops } from "../_actions/workshop"
import WorkshopNavbar from "@/components/navbar/workshops-nav"
import Card from "@/components/card/card"
import Link from "next/link"
import { Timestamp } from "firebase/firestore"

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const Workshops = async ({ searchParams }: ProductsPageProps) => {
  const { categories, search } = searchParams
  const workshops = await getWorkshops({ categories, search })
  const sortedWorkshops = workshops.sort((a, b) => {
    const a_date = new Date(
      new Timestamp(a.created_on.seconds, a.created_on.nanoseconds).toDate()
    )
    const b_date = new Date(
      new Timestamp(b.created_on.seconds, b.created_on.nanoseconds).toDate()
    )
    return b_date.getTime() - a_date.getTime()
  })

  return (
    <div className="workshops-container">
      <WorkshopNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center py-16 gap-8 xl:gap-16 px-8 md:px-12">
        {sortedWorkshops.map((workshop, index) => (
          <Link
            aria-label={workshop.name}
            key={index}
            href={`/workshop/${workshop.id}`}
            className="inline-block w-full max-w-[400px] h-full"
          >
            <Card
              name={workshop.name}
              tagline={workshop.tagline}
              instructor_name={workshop.instructor_name}
              is_paid={workshop.is_paid}
              workshop_amount={workshop.workshop_amount}
              workshop_starting_date={workshop.workshop_starting_date}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Workshops