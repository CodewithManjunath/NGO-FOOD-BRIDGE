import { notifications } from '../data/mockData'

export default function NotificationsPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Updates</span>
        <h1>Notifications</h1>
      </div>

      <div className="card-panel notification-list">
        {notifications.map((item) => (
          <div key={item.id} className={`notification-item ${item.read ? '' : 'unread'}`}>
            <span className="dot" />
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
