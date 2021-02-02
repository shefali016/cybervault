import { useTheme } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'
import { Account } from '../../utils/Interface'
import { createStripeAccountLink } from '../../apis/stripe'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { useParams } from 'react-router-dom'

type StateProps = { account: Account }
type Props = { history: any } & StateProps

const StripeAccountLinkRefreshScreen = ({ account, history }: Props) => {
  const theme = useTheme()
  const { id } = useParams<{ id: string | undefined }>()

  useEffect(() => {
    handleLinkRefresh()
  }, [])

  const handleLinkRefresh = async () => {
    if (typeof id === 'string') {
      const accountLink = await createStripeAccountLink(id)
      if (accountLink && accountLink.url) {
        window.location.href = accountLink.url
      }
    }
  }

  return (
    <div className={'centerContent'}>
      <ReactLoading type={'bubbles'} color={theme.palette.primary.main} />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account
})

export default connect(mapState)(StripeAccountLinkRefreshScreen)
