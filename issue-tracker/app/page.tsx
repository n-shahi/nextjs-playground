import Image from 'next/image'
import NavBar from './NavBar'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <>
    <div>Hello World</div>
    <Pagination itemCount={50} pageSize={10} currentPage={4} />
    </>
  )
}
