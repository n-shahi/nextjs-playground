import dynamic from "next/dynamic"

const DynamicIssueForm = dynamic(
  () => import('../_components/IssueForm'), 
  { ssr: false, loading: () => <p>Loading...</p> }
)

const NewIssuePage = () => {
  return (
    <div>
      <h1>Issue Form</h1>
      <DynamicIssueForm />
    </div>
  )
}
export default NewIssuePage
