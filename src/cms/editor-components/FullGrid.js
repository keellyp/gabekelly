import React from 'react'
import {encodeWidgetDataObject, decodeWidgetDataObject, cPatternWithId} from '../utils/helpers'

const FullGridPreview = ({obj, getAsset}) => {
  return (
    <div>
      <img src={getAsset(obj.src)} alt={obj.alt} />
      <p>{obj.caption}</p>
    </div>
  )
}

export const FullGrid = {
  name: 'full_grid',
  label: 'Full grid',
  widget: 'list',
  fields: [{
    name: 'alt',
    label: 'Alt',
    widget: 'string'
  }, {
    name: 'caption',
    label: 'Caption',
    widget: 'text',
    required: false
  }, {
    name: 'src',
    label: 'Image',
    widget: 'image'
  }],
  pattern: cPatternWithId('full_grid'),
  fromBlock: (match) => decodeWidgetDataObject(match[1]),
  toBlock: (obj) => JSON.stringify({ widget: 'full_grid', config: encodeWidgetDataObject(obj) }),
  toPreview: (obj, getAsset) => <FullGridPreview obj={obj} getAsset={getAsset}/>
}
