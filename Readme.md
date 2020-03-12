# react-meteor-hooks ☄️
React Hooks for Meteor. It was never easier to integrate React into the Meteor stack.

## Usage
Just import the hooks you need from this module and you are ready to use Meteors reactive data in React. All Meteor computations from the hooks are stopped automatically when the component is removed from the DOM.

```javascript
import React from 'react'
import { useCurrentUser } from 'react-meteor-hooks'

const UserWidget = () => {
  const currentUser = useCurrentUser()
  return(
    <div>
      { currentUser ? <p>{ currentUser.userName }</p> : <p>You are not logged in.</p> }
    </div>
  )
}

```

## Available Hooks

### useTracker( Function: trackerFun [, Array: deps] ) : trackerFunResult
Runs a function inside `Tracker.autorun` and can return reactive data.
```javascript
import React from 'react'
import { useTracker } from 'react-meteor-hooks'

const UserBooks = (sortBy) => {
  const data = useTracker(() => {
    const userProfile = Meteor.user().profile
    const userBooks = Books.find({ _owner: Meteor.userId() }, { sort: { [sortBy]: -1 }})
    return { userProfile, userBooks }
  }, [sortBy])
  // pass [sortBy] as second arg - so that this function will be rerun if sortBy changes

  const books = data.userBooks.map(Book)
  // ...
}

```

### useSubscription( String: subscriptionName [, ...subscriptionParams] ) : Boolean
Subscribes to a publication and returns a reactive "loading" var.
```javascript
import React from 'react'
import { useSubscription } from 'react-meteor-hooks'

const UserBooks = (sortBy, showLimit) => {
  const loading = useSubscription('user_books', showLimit)
  // subscription will be rerun if showLimit changes
  if (loading) {
    // ...
  }
  // ...
}

```

### useMethod( String: methodName [, {transform}] ) : Object
Returns `{ isLoading, data, error, call }` object to work with meteor methods.
Full example including `useEffect` at https://codesandbox.io/s/kj9zqqyrr
```javascript
import React from 'react'
import { useMethod } from 'react-meteor-hooks'

const UserBooks = () => {
  const { isLoading, data, error, call } = useMethod('add_book', { transform: result => result.updatedAt = new Date() })

  if (isLoading) return 'Adding book...'
  if (error) return `Error: ${err.message}`
  return (
    <div>
      <button
        onClick={async () => {
          await call('Moby Dick')
          console.log('Meteor call completed')
        }}
      >
        Add
        </button>
      {data && (
        <p>New book added at {data.updatedAt.toLocalString()}. ID: {data.id}</p>
      )}
    </div>
  )
}

export default UserBooks
```

### useMongoFetch( MeteorCursor: cursor [, Array: deps] ) : Array | Object
Fetches a MeteorCursor and returns the result.
```javascript
import React from 'react'
import { useMongoFetch, useSubscription } from 'react-meteor-hooks'

const UserBooks = (sortBy, showLimit) => {
  const loading = useSubscription('user_books', showLimit)
  if (loading) {
    // ...
  } else {
    const allBooks = useMongoFetch(Books.find({}, { sort: { [sortBy] : -1 }}), [sortBy])
    const books = allBooks.map(/* ... */)
    // ...
  }
}

```

### useCurrentUser() : Object | null
Returns the current logged in User or null.
```javascript
import React from 'react'
import { useCurrentUser, useSubscription } from 'react-meteor-hooks'

const UserBooks = (sortBy, showLimit) => {
  const user = useCurrentUser()
  if (user) {
    const loading = useSubscription('user_books', showLimit)
    if (loading) {
      // ...
    } else {
      // ...
    }
  }
}

```

### useSession(String: sessionName) : result | undefined
Returns value of a Session var.
```javascript
import React from 'react'
import { useSession } from 'react-meteor-hooks'

Session.set('currentPage', 1)

const UserBooks = (sortBy, showLimit) => {
  const page = useSession('currentPage')
  // ...
}

```


### Note
This package was inspired by a [blog post](https://www.andersen.berlin/blog/2018/11/06/meteor-and-react-hooks/) of ARTHUR ANDERSEN. Go check out his blog!