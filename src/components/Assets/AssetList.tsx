import React, { useEffect, useState } from 'react'
import { getAssets } from '../../apis/assets'
import ReactPlayer from 'react-player'
import { Asset } from '../../utils/types'

const AssetList = (props?: Object) => {
  const [assets, setAssets] = useState([] as Array<any>)

  useEffect(() => {
    _getAssets()
  }, [])

  const _getAssets = async () => {
    const assets = await getAssets()
    setAssets(assets)
  }

  return (
    <div>
      {assets.map((asset) => (
        <ReactPlayer key={asset.id} controls url={asset.original.url} />
      ))}
    </div>
  )
}

export default AssetList
