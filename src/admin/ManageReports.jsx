import { reports } from '../data/mockData'

export default function ManageReports() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Operations</span>
        <h1>Manage Community Reports</h1>
      </div>

      <div className="table-wrap card-panel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td>{report.location}</td>
                <td>{report.priority}</td>
                <td>{report.status}</td>
                <td><button type="button" className="secondary-button small-button">Assign</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
