import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import withData from '../config'

import AuthorList from './AuthorList'

const query = gql`
  query {
    author {
      id
      name
    }
  }
`

const Index = () => {
  return (
    <Query // <- Wrapping the main component with Query component from react-apollo
      query={query}
      fetchPolicy={'cache-and-network'}
    >
      {({ data: { author: authors } }) => {
        return (
          <div>
            <h1>My Authors </h1>
            <AuthorList authors={authors} />
          </div>
        )
      }}
    </Query>
  )
}

export default withData(Index)
