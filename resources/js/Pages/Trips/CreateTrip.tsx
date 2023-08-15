import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { PageProps, Trip, User } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Select, { MultiValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import { FormEventHandler, useState } from 'react'

type Option = {
  label: string
  value: number
}

function CreateTrip() {
  const user = usePage<PageProps>().props.auth.user
  const [users, setUsers] = useState<MultiValue<Option>>([{ label: user.name, value: user.id }])

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      name: '',
      description: '',
      members: [user.id],
    })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post('/trips');
  }

  const promiseOptions = async (inputValue: string) => {
    const res = await axios.get(route('users', { search: inputValue }))
    return res.data.data.map((user: User) => ({
      label: user.name,
      value: user.id,
    }))
  }

  const addUsers = (options: MultiValue<Option>) => {
    setUsers(options)
    setData((prev) => ({
      ...prev,
      members: options.map((option) => option.value),
    }))
  }

  return (
    <>
      <Head title="My Trips" />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6  py-12">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <section className="max-7w-xl">
            <header className="md:flex w-full items-center">
              <div className="flex-grow">
                <h2 className="text-lg font-medium text-gray-900">New Trip</h2>

                <p className="mt-1 text-sm text-gray-600">
                  Create a new trip expense tracking and invite members to the
                  trip
                </p>
              </div>
            </header>

            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={promiseOptions}
              onChange={addUsers}
              value={users}
              isClearable={users.some((user) => user.value !== user.id)}
            />

            <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
              <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                  id="name"
                  className="mt-1 block w-full"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                  isFocused
                  autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
              </div>

              <div>
                <InputLabel htmlFor="description" value="Description" />

                <TextInput
                  id="description"
                  type="text"
                  className="mt-1 block w-full"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  required
                  autoComplete="username"
                />

                <InputError className="mt-2" message={errors.description} />
              </div>

              <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  )
}

CreateTrip.layout = (page: any) => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Create New Trip
      </h2>
    }
    user={page.props.auth.user}
    children={page}
  />
)

export default CreateTrip
