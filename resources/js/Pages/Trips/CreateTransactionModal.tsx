import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { Modal } from '@mui/material'
import { useClickAway } from '@uidotdev/usehooks'
import InputLabel from '@/Components/InputLabel'
import { FormEventHandler, useState } from 'react'

export default function CreateTransactionModel({
  tripId,
  open,
  handleOpenModal,
  handleCloseModal,
}: any) {
  const { data, setData, post, errors, processing, recentlySuccessful, reset } =
    useForm({
      name: '',
      amount: '',
      category: '',
      tripId: tripId,
    })

  const ref = useClickAway(() => {
    handleCloseModal()
  }) as React.MutableRefObject<HTMLInputElement>;

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/transactions')
    handleCloseModal()
    reset()
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-add-transaction"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          ref={ref}
        >
          <div className="bg-white4">
            <div className="flex w-full">
              <form onSubmit={submit} className="w-full">
                <div className="mt-2 space-y-6 w-full  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h2 className='text-xl font-extrabold'>Create a new bill</h2>
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
                    <InputLabel htmlFor="amount" value="Amount" />

                    <TextInput
                      id="amount"
                      type="number"
                      step="0.01"
                      min={1}
                      max={1000000}
                      className="mt-1 block w-full"
                      value={data.amount}
                      onChange={(e) => setData('amount', e.target.value)}
                      required
                      placeholder="0.00"
                    />

                    <InputError className="mt-2" message={errors.amount} />
                  </div>

                  <div>
                    <InputLabel htmlFor="category">
                      Select a bill category
                    </InputLabel>
                    <select
                      id="category"
                      className="mt-1 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={data.category}
                      onChange={(e) => setData('category', e.target.value)}
                      required
                    >
                      <option selected>Choose a category</option>
                      <option value="transportation">Transportation</option>
                      <option value="food">Food</option>
                      <option value="accomodation">Accomodation</option>
                      <option value="miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 sm:w-auto"
                    onClick={submit}
                  >
                    {processing ? 'Creating' : 'Create'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
