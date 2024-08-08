'use client'
interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('Error: ', error)
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <p>An unexpected error has occurred, please try again.</p>
        <button className='btn btn-outline' onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  )
}

export default ErrorPage
