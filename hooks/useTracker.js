import { useState, useEffect } from 'react'

export default function hook_useTracker(trackerFun, deps=[]) {
  const [res, setRes] = useState(trackerFun())
  let comp = null
  const stopComp = () => {
    comp && comp.stop()
    comp = null
  }

  useEffect(() => {
    stopComp()
    Tracker.autorun((currentComp) => {
      comp = currentComp
      setRes(trackerFun())
    })
    return stopComp
  }, deps)

  return res
}
