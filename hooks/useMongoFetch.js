import useTracker from './useTracker'

export default function hook_useMongoFetch(query, deps=[]) {
  const result = useTracker(() => query.fetch(), deps)
  return result
}
