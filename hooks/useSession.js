import useTracker from './useTracker'

export default function hook_useSession(sessionName) {
  if (!Session) return console.log('Please add Session to Meteor!')

  const result = useTracker(() => Session.get(sessionName), [sessionName])
  return result
}
