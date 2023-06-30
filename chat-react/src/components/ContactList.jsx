import Contact from './Contact'

export default function ContactList({users}) {
  return (
    <div className="flex-1 space-y-4 overflow-y-scroll p-4">
      {users.map((user) => (
        <Contact key={user.id} user={user} />
      ))}
    </div>
  )
}
