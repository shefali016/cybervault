import { IconButton, Typography } from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import headerImage from '../assets/landing_screen_header_1.png'
import { AppIcon } from 'components/Common/Core/AppIcon'
import { AppButton } from 'components/Common/Core/AppButton'
import AppTextField from 'components/Common/Core/AppTextField'
import { InputChangeEvent } from 'utils/Interface'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import MenuIcon from '@material-ui/icons/Menu'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import clsx from 'clsx'
import projectComputer from '../assets/landing_computer_1.png'
import paymentScreenPreview from 'assets/payment_screen_preview.png'
import portfolioPreview from 'assets/portfolio_preview.png'
import clientInvoicePreview from 'assets/client_invoice_preview.png'
import extraStoragePreview from 'assets/extra_storage_preview.png'
import analyticsPreview from 'assets/analyticsPreview.png'
import trusted1 from 'assets/trustedPartner1.png'
import trusted2 from 'assets/trustedPartner2.png'
import trusted3 from 'assets/trustedPartner3.png'
import trusted4 from 'assets/trustedPartner4.png'
import trusted5 from 'assets/trustedPartner5.png'
import trusted6 from 'assets/trustedPartner6.png'
import footerImage from 'assets/landing_footer.png'
import classes from '*.module.css'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { logout } from 'actions/authActions'

const LandingScreen = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = useState({
    email: '',
    atTop: window.scrollY < 30,
    navOpen: false
  })
  const { navOpen } = state

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (event: any) => {
    let scrollTop = window.scrollY
    const atTop = scrollTop < 30

    setState((state) => ({ ...state, atTop, navOpen: false }))
  }

  const renderNavItem = (title: string, hide?: boolean) => {
    return (
      <AppButton
        className={clsx(classes.navItem, hide ? classes.navItemInactive : '')}
        key={title}>
        <Typography className={classes.navItemTitle}>{title}</Typography>
      </AppButton>
    )
  }

  const renderNav = () => {
    return (
      <div className={classes.navContainer}>
        <div
          className={clsx(
            classes.nav,
            navOpen ? classes.navOpen : '',
            state.atTop ? '' : classes.navTranslucent
          )}>
          <AppIcon className={classes.appIcon} />
          <div className={classes.navItemContainer}>
            {[
              'Features',
              'Pricing',
              'Customers',
              'News'
            ].map((navItem: string) => renderNavItem(navItem))}
          </div>
          <div className={classes.navLoginContainer}>
            <AppButton
              className={classes.loginButton}
              onClick={props.isLoggedIn ? props.logout : goToDashboard}>
              <Typography className={classes.loginTitle}>
                {props.isLoggedIn ? 'Log out' : 'Log in'}
              </Typography>
            </AppButton>
            <GradiantButton
              className={classes.signUpButton}
              onClick={props.isLoggedIn ? goToDashboard : goToSignUp}>
              <Typography className={classes.loginTitle}>
                {props.isLoggedIn ? 'Dashboard' : 'Sign up'}
              </Typography>
            </GradiantButton>
          </div>
          <IconButton
            className={classes.navToggle}
            onClick={() =>
              setState((state) => ({ ...state, navOpen: !navOpen }))
            }>
            <MenuIcon className={classes.navToggleIcon} />
          </IconButton>
        </div>
        <div
          className={clsx(
            classes.navCollapsed,
            navOpen ? classes.navCollapsedOpen : classes.navCollapsedClosed
          )}>
          {['Features', 'Pricing', 'Customers', 'News'].map((navItem: string) =>
            renderNavItem(navItem, !navOpen)
          )}

          <AppButton
            className={clsx(
              classes.loginButton,
              !navOpen ? classes.navItemInactive : ''
            )}
            onClick={goToDashboard}>
            <Typography className={classes.loginTitle}>
              {props.isLoggedIn ? 'Dashboard' : 'Log in'}
            </Typography>
          </AppButton>
        </div>
      </div>
    )
  }

  const goToDashboard = () => {
    props.history.push('/dashboard')
  }

  const goToSignUp = () => {
    props.history.push({
      pathname: '/signUp',
      state: { email: state.email }
    })
  }

  const renderSignUpInput = () => {
    if (props.isLoggedIn) {
      return (
        <div className={classes.signUpInputContainer}>
          <GradiantButton
            className={classes.signUpButton}
            onClick={goToDashboard}>
            <Typography>Go to dashboard</Typography>
          </GradiantButton>
        </div>
      )
    }
    return (
      <div className={classes.signUpInputContainer}>
        <AppTextField
          darkStyle={true}
          onChange={(e: InputChangeEvent) =>
            setState((state) => ({ ...state, email: e.target.value }))
          }
          value={state.email}
          label='Enter your email'
          className={classes.signUpInput}
          style={{ maxWidth: 400, minWidth: 300 }}
          labelClassName={classes.signUpInputLabel}
          labelFocusedClassName={classes.signUpInputLabelFocused}
          onKeyUp={handleSignUpKeyUp}
        />
        <div className={classes.signUpButtonContainer}>
          <GradiantButton className={classes.signUpButton} onClick={goToSignUp}>
            <Typography>Sign up free</Typography>
          </GradiantButton>
          <Typography variant='caption' className={classes.signUpButtonCaption}>
            7-day free trial. Cancel anytime.
          </Typography>
        </div>
      </div>
    )
  }

  const handleSignUpKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      goToSignUp()
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerBackground}>
        <img src={headerImage} className={classes.headerImage} />
        <div className={classes.shadowOverlay} />
      </div>

      <div className={classes.header}>
        {renderNav()}
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
          {renderSignUpInput()}
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

      <div className={classes.section}>
        <div className={classes.sectionInner}>
          <Typography
            variant='h3'
            className='bold'
            style={{ marginBottom: theme.spacing(8), textAlign: 'center' }}>
            Trusted by the best.
          </Typography>
          <div className={classes.trustedPartnerContainer}>
            {[trusted3, trusted4, trusted5, trusted2, trusted1, trusted6].map(
              (src, index) => (
                <img
                  src={src}
                  className={
                    index === 2 || index === 3
                      ? classes.trustedPartnerImageWide
                      : classes.trustedPartnerImage
                  }
                />
              )
            )}
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
          {renderSignUpInput()}
        </div>
      </div>

      <div className={classes.section}>
        <div className={clsx('responsiveRow', classes.sectionInner)}>
          <div className={classes.footerListInnerRow}>
            <FooterList
              title={'About'}
              items={[
                { title: 'Blog', onClick: () => {} },
                { title: 'Press', onClick: () => {} },
                { title: 'Community', onClick: () => {} },
                { title: 'Privacy', onClick: () => {} },
                { title: 'Term & Conditions', onClick: () => {} }
              ]}
            />

            <FooterList
              title={'Product'}
              items={[
                { title: 'Secure Invoicing', onClick: () => {} },
                { title: 'Portfolio Sharing', onClick: () => {} },
                { title: 'Cloud Storage', onClick: () => {} },
                { title: 'Pricing & Fees', onClick: () => {} }
              ]}
            />
          </div>

          <div className={classes.footerListInnerRow}>
            <FooterList
              title={'Tutorials'}
              items={[
                { title: 'Getting Started', onClick: () => {} },
                { title: 'Creating Projects', onClick: () => {} },
                { title: 'Invoicing & Payments', onClick: () => {} }
              ]}
            />

            <FooterList
              title={'Support'}
              items={[
                { title: 'Contact Us', onClick: () => {} },
                { title: 'Careers', onClick: () => {} },
                { title: 'Status', onClick: () => {} }
              ]}
            />
          </div>
        </div>
      </div>
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

const FooterList = ({
  title,
  items
}: {
  title: string
  items: Array<{ title: string; onClick: () => void }>
}) => {
  const classes = useStyles()
  return (
    <div className={classes.footerListContainer}>
      <Typography variant='h6' className='bold'>
        {title}
      </Typography>
      <div className={classes.footerListItems}>
        {items.map(({ title, onClick }) => {
          return (
            <AppButton onClick={onClick} className={classes.footerListButton}>
              <Typography>{title}</Typography>
            </AppButton>
          )
        })}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  footerListContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(5)
  },
  footerListButton: {
    color: theme.palette.common.white,
    justifyContent: 'flex-start',
    minWidth: 200
  },
  footerListItems: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: theme.palette.background.surfaceHighlight,
    display: 'flex',
    flexDirection: 'column'
  },
  footerListInnerRow: {
    display: 'flex',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-around',
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column'
    }
  },

  imageFooter: { width: '100vw', position: 'relative' },
  imageFooterImage: { width: '100vw', objectFit: 'cover', minHeight: 500 },
  footerContent: {
    textAlign: 'center',
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: `linear-gradient(${theme.palette.background.default}, #FFFFFF00 30%, #FFFFFF00 30%, ${theme.palette.background.default})`,
    padding: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  footerTitle: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25
    }
  },
  footerSubTitle: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },

  trustedPartnerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  trustedPartnerImage: {
    width: '20vw',
    maxWidth: 250,
    minWidth: 120,
    objectFit: 'cover',
    margin: theme.spacing(1)
  },
  trustedPartnerImageWide: {
    width: '40vw',
    minWidth: 260,
    maxWidth: 500,
    objectFit: 'cover',
    margin: theme.spacing(1)
  },

  featureSlideContainer: {
    background: `linear-gradient(90deg, #09BDFF, #0088FC, #4E4EFF, #7B09FF)`,
    padding: theme.spacing(8),
    borderRadius: 30,
    flex: 1,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) }
  },
  featureRow: {
    display: 'flex',
    [theme.breakpoints.down('md')]: { flexDirection: 'column' }
  },
  featureSlideImage: {
    height: 'auto',
    width: '100%'
  },
  featureTitle: {
    [theme.breakpoints.down('md')]: {
      fontSize: 35
    }
  },
  featureContentContainer: {
    flex: 1,
    paddingLeft: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
      paddingTop: theme.spacing(5)
    }
  },

  sliderContainer: {
    width: '100%',
    maxWidth: 1200,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row'
    }
  },
  sliderBg: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    height: 10,
    backgroundColor: theme.palette.background.surfaceHighlight,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'auto',
      maxWidth: 10
    }
  },
  slider: {
    height: 10,
    flex: 1,
    transition: theme.transitions.create(['background'], {
      duration: 500
    }),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      height: 'auto',
      maxWidth: 10
    }
  },
  activeSlider: { background: theme.palette.primary.main },
  sliderItem: {
    width: '100%',
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      flex: 1,
      alignSelf: 'stretch',
      paddingLeft: theme.spacing(0),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    cursor: 'pointer'
  },
  sliderItemBorder: {
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: theme.palette.background.surfaceHighlight,
    [theme.breakpoints.down('sm')]: {
      borderRightStyle: 'none',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.background.surfaceHighlight
    }
  },
  sliderTitle: { fontWeight: 'bold' },
  sliderSubtitle: { color: theme.palette.text.meta },
  sliderItems: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flex: 1,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },

  headerBackground: { width: '100vw', height: '100vh', position: 'absolute' },
  shadowOverlay: {
    background: `linear-gradient(#FFFFFF00 70%,  ${theme.palette.background.default})`,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  checkListItem: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  checkListIcon: { fontSize: 30, color: theme.palette.primary.main },
  checkListTextContainer: { paddingLeft: theme.spacing(2) },
  checkListTitle: { fontWeight: 'bold' },
  checkListSubtitle: { color: theme.palette.text.meta },

  computerImage: {
    width: '100%',
    height: 'auto'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },

  navContainer: { position: 'fixed', width: '100%', zIndex: 100 },
  nav: {
    top: 0,
    display: 'flex',
    padding: theme.spacing(3),
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: theme.transitions.create(['background'], {
      duration: 500
    })
  },
  navTranslucent: { background: `${theme.palette.background.secondary}` },
  navOpen: { background: theme.palette.background.secondary },
  navItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  navItem: {
    color: theme.palette.common.white,
    width: 150,
    opacity: 1,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      paddingTop: 15,
      paddingBottom: 15
    },
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
  navItemInactive: { opacity: 0 },
  navItemTitle: { fontSize: 20 },
  navLoginContainer: {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  navToggle: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  navToggleIcon: { fontSize: 40, color: theme.palette.common.white },
  navCollapsed: {
    paddingBottom: theme.spacing(3),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: theme.transitions.create(['background', 'height', 'opacity'], {
      duration: 500
    })
  },
  navCollapsedOpen: {
    background: theme.palette.background.secondary
  },
  navCollapsedClosed: {
    pointerEvents: 'none'
  },

  loginButton: {
    color: theme.palette.common.white,
    width: 150,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      paddingTop: 15,
      paddingBottom: 15,
      color: theme.palette.primary.light
    },
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
  loginTitle: { fontSize: 20 },

  headerContent: {
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  },
  headerTitle: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25
    }
  },
  headerSubTitle: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },

  signUpInputContainer: {
    display: 'flex',
    marginTop: theme.spacing(6),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  signUpInput: {
    maxWidth: 400,
    marginRight: 30,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingLeft: 10,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  signUpInputLabel: {
    marginTop: 10,
    marginLeft: 10,
    color: theme.palette.common.white
  },
  signUpInputLabelFocused: { marginTop: 0, marginLeft: 0 },
  signUpButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  signUpButton: { height: 60, borderRadius: 30 },
  signUpButtonCaption: { position: 'absolute', bottom: -25 },

  appIcon: {
    color: theme.palette.common.white,
    fontSize: 50
  },
  header: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  headerImage: {
    top: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    position: 'absolute'
  },

  section: {
    padding: `${theme.spacing(12)}px ${theme.spacing(6)}px`,
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.background,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(12)}px ${theme.spacing(3)}px`
    }
  },
  sectionInner: { flex: 1, maxWidth: 1400 }
}))

const mapState = (state: ReduxState) => ({ isLoggedIn: state.auth.isLoggedIn })

const mapDispatch = { logout: () => logout() }

export default connect(mapState, mapDispatch)(LandingScreen)
