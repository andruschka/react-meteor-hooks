import useTracker from './useTracker'

export default function hook_useCurrentUser() {
  const user = useTracker(() => Meteor.isClient && Meteor.user())
  return user
}
