import useTracker from './useTracker'

export default function hook_useMongoFetch(cursor, deps=[]) {
  const result = useTracker(() => cursor.fetch(), deps)
  return result
}
