import clsx from 'clsx'
import React from 'react'
import { useStyles } from 'screens/LandingScreens/style'
import { FooterList } from './FooterList'

export const FooterNav = () => {
  const classes = useStyles()
  return (
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
  )
}
