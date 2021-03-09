import React, { useEffect, useState } from 'react'
import { useStyles } from './style'
import { logout } from 'actions/authActions'
import { Nav } from 'components/Landing/Nav'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { TrustedPartners } from 'components/Landing/TrustedPartners'
import headerImage from 'assets/pricing_header.png'
import SubscriptionPricingSlider from 'components/Subscription/SubscriptionPricingSlider'
import { useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { FrequentQuestion } from 'components/Landing/FrequentQuestion'
import { FooterNav } from 'components/Landing/FooterNav'
import footerImage from 'assets/pricing_footer.png'
import { SignUpInput } from 'components/Landing/SignUpInput'
import { InputChangeEvent } from 'utils/Interface'
import { SocialBar } from 'components/Landing/SocialBar'

const PricingScreen = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()

  const [email, setEmail] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goToSignUp = () => {
    props.history.push({
      pathname: '/signUp',
      state: { email }
    })
  }

  const goToDashboard = () => {
    props.history.push('/dashboard')
  }

  const handleContactSales = () => {}

  return (
    <div className={classes.container}>
      <Nav
        history={props.history}
        onLogout={props.logout}
        goToSignUp={goToSignUp}
        isLoggedIn={props.isLoggedIn}
      />

      <div className={classes.headerBackground}>
        <img src={headerImage} className={classes.headerImage} />
        <div className={classes.shadowOverlay} />
      </div>

      <div className={classes.pricingScreenContent}>
        <div className={classes.section} style={{ paddingBottom: 0 }}>
          <div className={classes.subscriptionPricesContainer}>
            <Typography
              variant='h4'
              className='bold'
              style={{
                marginLeft: theme.spacing(3),
                marginRight: theme.spacing(3),
                marginBottom: theme.spacing(6),
                textAlign: 'center'
              }}>
              Affordable plans that suit your needs.
            </Typography>
            <SubscriptionPricingSlider onStart={goToSignUp} />
          </div>
        </div>

        <div className={classes.section}>
          <div
            className={classes.sectionInner}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Typography
              variant='h4'
              className='bold'
              style={{
                marginBottom: theme.spacing(6),
                textAlign: 'center'
              }}>
              Don’t see a plan that works for you?
            </Typography>
            <GradiantButton
              onClick={handleContactSales}
              className={classes.roundGradiantButton}>
              <Typography className={classes.loginTitle}>
                Contact sales
              </Typography>
            </GradiantButton>
          </div>
        </div>

        <TrustedPartners />

        <div className={classes.section}>
          <div className={classes.sectionInner}>
            <Typography
              variant='h3'
              align='center'
              className='bold'
              style={{ marginBottom: theme.spacing(8) }}>
              Frequently Asked Questions
            </Typography>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'How do monthly and yearly plans differ?'}
                content={
                  'On a yearly plan you get charged once per year and receive a discount on your annual subscription price.'
                }
              />
              <FrequentQuestion
                title={'Do you offer educational discounts?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'How do monthly and yearly plans differ?'}
                content={
                  'On a yearly plan you get charged once per year and receive a discount on your annual subscription price.'
                }
              />
              <FrequentQuestion
                title={'Do you offer educational discounts?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'Do you offer refunds?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
              <FrequentQuestion
                title={'Why is there a transaction fee?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'Do you offer a free trial or a free plan?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
              <FrequentQuestion
                title={'I need additional storage, can I upgrade storage only?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'What is CreatorsCloud.io and why would I use it?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
              <FrequentQuestion
                title={'Can I customize the  Review Pages to suit my company?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={'When can I withdraw my available funds?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
              <FrequentQuestion
                title={'How does the receiving payment work?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
            <div className={'responsiveRow'}>
              <FrequentQuestion
                title={
                  'I have high budget projects, is this service safe to use?'
                }
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
              <FrequentQuestion
                title={'Are there any tutorials on how to get started?'}
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            </div>
          </div>
        </div>

        <div className={classes.imageFooter}>
          <img src={footerImage} className={classes.imageFooterImage} />
          <div className={classes.footerContent}>
            <Typography className={classes.footerTitle} variant='h4'>
              {props.isLoggedIn
                ? 'Your dashboard awaits you'
                : 'Get started with a free trial today.'}
            </Typography>
            <Typography className={classes.footerSubTitle} variant='h6'>
              {props.isLoggedIn
                ? 'Start your project now'
                : 'Enjoy a 7-day free trial on us, no strings attached.'}
            </Typography>
            <SignUpInput
              value={email}
              onChange={(e: InputChangeEvent) => setEmail(e.target.value)}
              isLoggedIn={props.isLoggedIn}
              goToDashboard={goToDashboard}
              goToSignUp={goToSignUp}
              onEnter={goToSignUp}
            />
          </div>
        </div>

        <FooterNav />

        <SocialBar />
      </div>
    </div>
  )
}

const mapState = (state: ReduxState) => ({ isLoggedIn: state.auth.isLoggedIn })

const mapDispatch = { logout: () => logout() }

export default connect(mapState, mapDispatch)(PricingScreen)
