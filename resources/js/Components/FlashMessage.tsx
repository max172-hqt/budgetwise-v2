import { useState, useEffect } from 'react'

export default function FlashMessage({ message }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
      setShow(true)
    }
  }, [message])

  if (!show) {
    return null
  }

  return (
    <div
      className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md absolute top-5 right-5"
      role="alert"
    >
      <div className="flex">
        <div>{message}</div>
      </div>
    </div>
  )
}
