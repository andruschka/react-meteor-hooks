import { useState, useEffect } from 'react'

export default function hook_useSubscription(pubName, ...subOpts) {
  const [loading, setLoading] = useState(true)
  let comp = null
  let handle = null

  const stopComp = () => {
    comp && comp.stop()
    handle && handle.stop()
    comp = null 
    handle = null
  }

  useEffect(() => {
    stopComp()
    Tracker.autorun((currentComp) => {
      comp = currentComp

      handle = Meteor.subscribe(pubName, ...subOpts)
      setLoading(!handle.ready())
    })
    return stopComp
  }, [pubName, ...subOpts])

  return loading
}
