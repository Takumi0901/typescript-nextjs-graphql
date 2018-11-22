import * as React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
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

const ADD_AUTHOR = gql`
  mutation insert_author($objects: [author_insert_input!]) {
    insert_author(objects: $objects) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`
const Index = () => {
  let input: any
  return (
    <React.Fragment>
      <Query query={query} fetchPolicy={'cache-and-network'}>
        {({ data: { author: authors } }) => {
          return (
            <div>
              <h1>My Authors </h1>
              <AuthorList authors={authors} />
            </div>
          )
        }}
      </Query>
      <Mutation mutation={ADD_AUTHOR}>
        {(addAuthor, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                addAuthor({ variables: { objects: [{ name: input.value }] } })
                input.value = ''
              }}
            >
              <input
                ref={node => {
                  input = node
                }}
              />
              <button type="submit">Add Author</button>
            </form>
          </div>
        )}
      </Mutation>
    </React.Fragment>
  )
}

export default withData(Index)
