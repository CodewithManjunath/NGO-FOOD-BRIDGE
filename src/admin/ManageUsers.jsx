import { users } from '../data/mockData'

export default function ManageUsers() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">User management</span>
        <h1>Manage Users</h1>
      </div>

      <div className="table-wrap card-panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
