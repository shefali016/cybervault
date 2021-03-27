import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Region } from 'utils/Interface'
import AppSelect, { Item } from '../Common/Core/AppSelect'

type Props = {
  showCurrency?: boolean
  onChange: (region: Region) => void
  regionCode: string | undefined
}

const RegionSelect = ({ showCurrency, onChange, regionCode }: Props) => {
  const [state, setState] = useState<{
    menuItems: Array<Item>
    regions: { [code: string]: Region }
  }>({
    menuItems: [],
    regions: {}
  })
  const { menuItems, regions } = state

  useEffect(() => {
    fetchCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCountries = async () => {
    try {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const countries = await res.json()
      const { regions, items } = mapCountriesToMenuItems(countries)
      console.log(items)
      setState((state) => ({ ...state, regions, menuItems: items }))
    } catch (error) {
      console.log('Failed to fetch countries')
    }
  }

  const mapCountriesToMenuItems = (
    countries: any
  ): { regions: { [key: string]: Region }; items: Array<Item> } => {
    return countries.reduce(
      (
        acc: { regions: { [key: string]: Region }; items: Array<Item> },
        { name, flag, currencies, alpha2Code }: any
      ) => {
        const currency = currencies[0]
        const currencySymbol = currency.symbol
        const currencyCode = currency.code
        const region = {
          code: alpha2Code,
          name,
          flag,
          currencySymbol,
          currencyCode
        }
        const item = {
          value: region.code,
          renderer: () => (
            <div style={{ display: 'flex', padding: '0 10px 0 10px' }}>
              <img
                src={flag}
                height='20px'
                width='25px'
                alt={`${name}-flag`}
                style={{ marginRight: 15 }}
              />
              {showCurrency ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body1' style={{ marginRight: 5 }}>
                    {currencySymbol}
                  </Typography>
                  <Typography variant='body1'>{currencyCode}</Typography>
                </div>
              ) : (
                <div style={{ display: 'flex' }}>
                  <Typography variant='body1'>{name}</Typography>
                </div>
              )}
            </div>
          )
        }
        acc.regions[region.code] = region
        acc.items.push(item)
        return acc
      },
      { regions: {}, items: [] }
    )
  }

  const handleChange = (code: string) => onChange(regions[code])

  return (
    <AppSelect
      items={menuItems}
      value={regionCode !== undefined ? regionCode : 'US'}
      onChange={(event: any) => {
        handleChange(event.target.value)
      }}
    />
  )
}

export default RegionSelect
