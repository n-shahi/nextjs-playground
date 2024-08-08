import { notFound } from "next/navigation";

interface Props {
  params: {id: number;}
}

const UserDetail = ({params: {id}}: Props) => {
  if (id > 10) {
    return notFound()
  }
  return (
    <div>
      <h1>User Detail</h1>
      <p>User ID: {id}</p>
    </div>
  )
}

export default UserDetail
