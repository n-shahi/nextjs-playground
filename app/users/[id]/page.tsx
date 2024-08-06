
interface Props {
  params: {id: number;}
}

const UserDetail = ({params: {id}}: Props) => {
  return (
    <div>
      <h1>User Detail</h1>
      <p>User ID: {id}</p>
    </div>
  )
}

export default UserDetail
