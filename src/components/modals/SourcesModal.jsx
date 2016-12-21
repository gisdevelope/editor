import React from 'react'
import Modal from './Modal'
import Heading from '../Heading'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import publicSources from '../../config/tilesets.json'
import colors from '../../config/colors'
import { margins, fontSizes } from '../../config/scales'

import AddIcon from 'react-icons/lib/md/add-circle-outline'

class PublicSource extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  }

  render() {
    return <div style={{
        verticalAlign: 'top',
        marginTop: margins[2],
        marginRight: margins[2],
        backgroundColor: colors.gray,
        display: 'inline-block',
        width: 240,
        fontSize: fontSizes[4],
        color: colors.lowgray,
    }}>
      <div style={{
        padding: margins[2],
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div>
          <span style={{fontWeight: 700}}>{this.props.title}</span><br/>
          <span style={{fontSize: fontSizes[5]}}>{this.props.id}</span>
        </div>
        <span style={{flexGrow: 1}} />
        <a style={{
          display: 'table',
          cursor: 'pointer',
          backgroundColor: colors.midgray,
          color: colors.lowgray,
          padding: margins[1],
          borderRadius: 2,
        }}>
          Add
        </a>
      </div>
    </div>
  }
}

class SourceEditor extends React.Component {
  static propTypes = {
    sourceId: React.PropTypes.string.isRequired,
    source: React.PropTypes.object.isRequired,
  }

  render() {
    const inputProps = { }
    return <div style={{
    }}>
      <InputBlock label={"Source ID"}>
        <StringInput {...inputProps}
          value={this.props.sourceId}
        />
      </InputBlock>
      <InputBlock label={"Source URL"}>
        <StringInput {...inputProps}
          value={this.props.source.url}
        />
      </InputBlock>
      <InputBlock label={"Source Type"}>
        <StringInput {...inputProps}
          value={this.props.source.type}
        />
      </InputBlock>
    </div>
  }
}


class SourcesModal extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    toggle: React.PropTypes.func.isRequired,
  }

  render() {
    const activeSources = Object.keys(this.props.mapStyle.sources).map(sourceId => {
      const source = this.props.mapStyle.sources[sourceId]
      return <SourceEditor sourceId={sourceId} source={source} />
    })

    const tilesetOptions = publicSources.map(tileset => {
      return <PublicSource
        id={tileset.id}
        type={tileset.type}
        title={tileset.title}
        description={tileset.description}
      />
    })

    const inputProps = { }
    return <Modal
      isOpen={this.props.isOpen}
      toggleOpen={this.props.toggle}
      title={'Sources'}
    >
      <Heading level={4}>Active Sources</Heading>
      {activeSources}

      <Heading level={4}>Add New Source</Heading>
      <InputBlock label={"TileJSON URL"}>
        <StringInput {...inputProps} />
      </InputBlock>
      <Heading level={4}>Choose Public Source</Heading>
      <p style={{color: colors.lowgray, fontSize: fontSizes[5]}}>Add one of the publicly availble sources to your style.</p>
      <div style={{maxwidth: 500}}>
      {tilesetOptions}
      </div>
    </Modal>
  }
}

export default SourcesModal
