import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import headerImage from 'assets/landing_screen_header_1.png'
import { InputChangeEvent } from 'utils/Interface'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import clsx from 'clsx'
import projectComputer from 'assets/landing_computer_1.png'
import paymentScreenPreview from 'assets/payment_screen_preview.png'
import portfolioPreview from 'assets/portfolio_preview.png'
import clientInvoicePreview from 'assets/client_invoice_preview.png'
import extraStoragePreview from 'assets/extra_storage_preview.png'
import analyticsPreview from 'assets/analyticsPreview.png'
import footerImage from 'assets/landing_footer.png'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { logout } from 'actions/authActions'
import { useStyles } from './style'
import { Nav } from 'components/Landing/Nav'
import { TrustedPartners } from 'components/Landing/TrustedPartners'
import { FooterNav } from 'components/Landing/FooterNav'
import { SignUpInput } from 'components/Landing/SignUpInput'
import { SocialBar } from 'components/Landing/SocialBar'

const LandingScreen = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = useState({
    email: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goToDashboard = () => {
    props.history.push('/dashboard')
  }

  const goToSignUp = () => {
    props.history.push({
      pathname: '/signUp',
      state: { email: state.email }
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerBackground}>
        <img src={headerImage} className={classes.headerImage} />
        <div className={classes.shadowOverlay} />
      </div>

      <div className={classes.header}>
        <Nav
          history={props.history}
          onLogout={props.logout}
          goToSignUp={goToSignUp}
          isLoggedIn={props.isLoggedIn}
        />
        <div className={classes.headerContent}>
          <Typography className={classes.headerTitle} variant='h2'>
            So you can do what you do best,
          </Typography>
          <Typography className={classes.headerTitle} variant='h2'>
            creating content.
          </Typography>
          <Typography className={classes.headerSubTitle} variant='h5'>
            Virtually upload, and invoice clients in the most secure way.
          </Typography>
          <SignUpInput
            value={state.email}
            onChange={(e: InputChangeEvent) =>
              setState((state) => ({ ...state, email: e.target.value }))
            }
            isLoggedIn={props.isLoggedIn}
            goToDashboard={goToDashboard}
            goToSignUp={goToSignUp}
            onEnter={goToSignUp}
          />
        </div>
      </div>

      <div className={classes.section}>
        <div className={clsx('responsiveRow', classes.sectionInner)}>
          <div style={{ flex: 1.5, position: 'relative' }}>
            <img src={projectComputer} className={classes.computerImage} />
          </div>
          <CheckList
            title={'Content Theft Protection'}
            subtitle={
              'Our team of engineers created an algorithm that allows your clients pay for the content you create, without the risk of download n’ dashing.'
            }
            items={[
              {
                title: 'Secure Online Payments',
                subtitle:
                  'Review content, pay, & download assets. It’s that easy for your clients.'
              },
              {
                title: 'Professional Invoicing & Checkout',
                subtitle:
                  'Customizable invoicing for each client. Summarized project details displaying expenses, costs, and rentals.'
              },
              {
                title: 'Personalized Watermarking',
                subtitle:
                  'Protect your content from being used before purchasing. Keep all your assets secure until your campaign is paid for.'
              }
            ]}
          />
        </div>
      </div>

      <div className={classes.section}>
        <Slider
          items={[
            {
              title: 'Upload Content',
              subtitle: 'Add media assets to active campaign.'
            },
            {
              title: 'Invoice Client',
              subtitle: 'Send a customized invoice.'
            },
            {
              title: 'Receive Payment',
              subtitle: 'Receive payment securely.'
            }
          ]}
        />
      </div>

      <div className={classes.section}>
        <FeatureSlide
          title={'Invoice with milestone payments, or as a whole.'}
          subtitle={
            'Give your client’s the option to pay with instalments, or simply pay upon checkout.'
          }
          image={paymentScreenPreview}
          contentTitle={'Invoice with ease.'}
          content={[
            {
              title: 'Customize Invoices',
              content:
                'Add your client’s information, logo, branded colour and more.'
            },
            {
              title: 'Invoice ‘Viewed’ Notification',
              content:
                'Get updated in real-time once an invoice is sent, and viewed by a client.'
            },
            {
              title: 'No Limits',
              content:
                'Any project budget, big or small, we’ve got you covered.'
            }
          ]}
        />
      </div>

      <div className={classes.section}>
        <div className={clsx('responsiveRow', classes.sectionInner)}>
          <CheckList
            title={'Share Your Work, To Get More Work.'}
            subtitle={
              'Portfolio sharing has never been so simple. Creators can easily upload previous projects into organized folders, customize the appearance, and send to clients.'
            }
            items={[
              {
                title: 'Organized Portfolio',
                subtitle:
                  'Categorize your assets based on industry, date, or budget.'
              },
              {
                title: 'Easy & Fast Exporting',
                subtitle:
                  'With the click of a button, all your previous project details will be exported to the future client for review.'
              },
              {
                title: 'Detailed Project Breakdowns',
                subtitle:
                  'Showcase your previous work with added details of the project.'
              }
            ]}
          />
          <div style={{ flex: 1.5, position: 'relative' }}>
            <img src={portfolioPreview} className={classes.computerImage} />
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <Slider
          items={[
            {
              title: 'Create Portfolio',
              subtitle: 'Organized to your liking.'
            },
            {
              title: 'Upload Campaigns',
              subtitle: 'Showcase your best work.'
            },
            {
              title: 'Send To Client',
              subtitle: 'Email portfolio link to client.'
            }
          ]}
        />
      </div>

      <div className={classes.section}>
        <FeatureSlide
          title={'Say goodbye to “Can you also export this in…”'}
          subtitle={
            'Creators Cloud will give your client’s the ability to choose what aspect ratio and quality they want, so you don’t have to.'
          }
          image={clientInvoicePreview}
          contentTitle={'Give them the option, before they ask.'}
          content={[
            {
              title: 'Choose between different aspect ratios',
              content: 'Available ratios: 16:9, 9:16, 1:1, or 4:5'
            },
            {
              title: 'Download individual or all media assets',
              content: 'Or simply download all'
            },
            {
              title: 'Export different file sizes H.264 or ProRes',
              content: 'Available for download: 4K, 1080p, 720p.'
            }
          ]}
        />
      </div>

      <div className={classes.section}>
        <div className={clsx('responsiveRow', classes.sectionInner)}>
          <div style={{ flex: 1.5, position: 'relative' }}>
            <img src={extraStoragePreview} className={classes.computerImage} />
          </div>

          <CheckList
            title={'Storage, All In One Spot.'}
            subtitle={
              'Having limited storage blows, that’s why we offer endless storage plans that tailor towards your workflow.'
            }
            items={[
              {
                title: 'Affordable Storage Options',
                subtitle:
                  'Need additional storage? We offer a variety of storage plans that allow your portfolio to grow, keeping your assets all in one spot.'
              },
              {
                title: 'Never Lose Your Footage',
                subtitle:
                  'Our storage capacity allows us to backup files your footage, allowing you to keep the final cuts safe and secure on your account.'
              },
              {
                title: 'Store As Much As You Need',
                subtitle:
                  'Never run out of content uploads or storage. Upload H.264 files or ProRes Raw files to free-up space on your computer.'
              }
            ]}
          />
        </div>
      </div>

      <div className={classes.section}>
        <Slider
          items={[
            {
              title: 'Choose Additional Storage',
              subtitle: 'Storage plans from 100GB to 50TB'
            },
            {
              title: 'Update Storage Plan',
              subtitle: 'Update with a new, or existing plan'
            },
            {
              title: 'Continue Making Magic',
              subtitle: 'Wow, that was easy!'
            }
          ]}
        />
      </div>

      <div className={classes.section}>
        <FeatureSlide
          title={'Analytics & Reporting'}
          subtitle={
            'See your monthly revenue, active projects & late payments all in one spot.'
          }
          image={analyticsPreview}
          contentTitle={'Everything, all in one spot.'}
          content={[
            {
              title: 'Late Payment Reminders',
              content:
                'Kindly send custom email reminders to your clients for late payments.'
            },
            {
              title: 'Track Monthly Revenue',
              content:
                'Project production values automatically update as revenue, so you know the exact income coming in for each project. '
            },
            {
              title: 'Project Reminders',
              content:
                'Whether you have 5, 10, or 20 projects on the go, we’ll remind you what’s due and what’s coming up.'
            }
          ]}
        />
      </div>

      <TrustedPartners />

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
            value={state.email}
            onChange={(e: InputChangeEvent) =>
              setState((state) => ({ ...state, email: e.target.value }))
            }
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
  )
}

const Slider = ({
  items
}: {
  items: Array<{ title: string; subtitle: string }>
}) => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderBg}>
        {items.map((_, index) => (
          <div
            key={`slider-${index}`}
            className={clsx(
              classes.slider,
              index === selectedIndex ? classes.activeSlider : ''
            )}
            onClick={() => setSelectedIndex(index)}></div>
        ))}
      </div>
      <div className={classes.sliderItems}>
        {items.map((item: { title: string; subtitle: string }, index) => {
          return (
            <div
              key={item.title}
              className={clsx(
                classes.sliderItem,
                index !== items.length - 1 ? classes.sliderItemBorder : ''
              )}
              onClick={() => setSelectedIndex(index)}>
              <Typography variant='h6' className={classes.sliderTitle}>
                {item.title}
              </Typography>
              <Typography className={classes.sliderSubtitle}>
                {item.subtitle}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CheckList = ({
  title,
  subtitle,
  items
}: {
  title: string
  subtitle: string
  items: Array<{ title: string; subtitle: string }>
}) => {
  const theme = useTheme()
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
      <Typography
        variant={'h4'}
        className={'bold'}
        style={{ marginBottom: theme.spacing(1) }}>
        {title}
      </Typography>
      <Typography style={{ marginBottom: theme.spacing(3) }}>
        {subtitle}
      </Typography>
      <br />
      {items.map(({ title, subtitle }) => (
        <CheckListItem title={title} subtitle={subtitle} key={title} />
      ))}
    </div>
  )
}

const CheckListItem = ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) => {
  const classes = useStyles()
  return (
    <div className={classes.checkListItem}>
      <CheckCircleOutlineIcon className={classes.checkListIcon} />
      <div className={classes.checkListTextContainer}>
        <Typography variant='h5' className={classes.checkListTitle}>
          {title}
        </Typography>
        <Typography variant='body1' className={classes.checkListSubtitle}>
          {subtitle}
        </Typography>
      </div>
    </div>
  )
}

const FeatureSlide = ({
  title,
  subtitle,
  image,
  contentTitle,
  content
}: {
  title: string
  subtitle: string
  image: any
  contentTitle: string
  content: Array<{ title: string; content: string }>
}) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={classes.featureSlideContainer}>
      <Typography
        variant='h3'
        className={clsx(classes.featureTitle, 'bold')}
        style={{ marginBottom: theme.spacing(1) }}>
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <div
        className={classes.featureRow}
        style={{ paddingTop: theme.spacing(8) }}>
        <div style={{ flex: 1.5, position: 'relative' }}>
          <img src={image} className={classes.featureSlideImage} />
        </div>
        <div className={classes.featureContentContainer}>
          <Typography variant='h4' style={{ marginBottom: theme.spacing(4) }}>
            {contentTitle}
          </Typography>
          {content.map(({ title, content }, index) => (
            <div
              key={title}
              style={{
                marginBottom: theme.spacing(
                  index === content.length - 1 ? 0 : 4
                )
              }}>
              <Typography variant='h6'>{title}</Typography>
              <Typography>{content}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapState = (state: ReduxState) => ({ isLoggedIn: state.auth.isLoggedIn })

const mapDispatch = { logout: () => logout() }

export default connect(mapState, mapDispatch)(LandingScreen)
