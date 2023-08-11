import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Welcome({ auth }: PageProps) {
  return (
    <>
      <Head title="Budget Wise V2" />
      <div className="relative sm:flex sm:justify-center sm:items-center max-w-5xl mx-auto min-h-screen bg-dots-darker bg-center  selection:bg-red-500 selection:text-white">
        <div className="flex flex-col text-center max-w-5xl">
          <h1 className="max-w-3xl mx-auto text-5xl font-bold text-center md:text-6xl lg:text-7xl">
            Budget Wise
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-center text-gray-700 text-md leading-relaxed md:mt-8 md:text-lg lg:mt-10">
            Provide an easy way to manage trips, track expenses and provide
            suggestions on resolving debts among members in the trip.
          </p>
          <div className="flex justify-center items-center mt-6 gap-4">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="font-extrabold bg-red-500 text-white hover:bg-red-600 uppercase px-4 py-2"
              >
                Go to my Trips
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="font-extrabold bg-red-500 text-white hover:bg-red-600 uppercase px-4 py-2"
                >
                  Log in
                </Link>

                <Link
                  href={route('register')}
                  className="ml-4 font-semibold text-gray-600 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-50a uppercase"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
