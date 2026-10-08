import { reports } from '../data/mockData'

export default function MyReportsPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">My activity</span>
        <h1>My Reports</h1>
      </div>

      <div className="table-wrap card-panel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td>{report.status}</td>
                <td>{report.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
