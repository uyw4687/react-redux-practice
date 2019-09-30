import React, { Component } from 'react'

import './CreateButtons.css'

class CreateButtons extends Component {
    render() {
        var buttonStylePreview = {
            fontWeight: (this.props.isPreview ? 600 : 100)
        }
        var buttonStyleWrite = {
            fontWeight: (this.props.isPreview ? 100 : 600)
        }
        return (
            <div className="CreateButtons">
                <button id={'back-'+this.props.buttonId+'-article-button'} onClick={this.props.onBack}>Back</button>
                <button id={'confirm-'+this.props.buttonId+'-article-button'} onClick={this.props.onConfirm}>Confirm</button>
                <button style={buttonStylePreview} id='preview-tab-button' onClick={this.props.onPreview}>Preview</button>
                <button style={buttonStyleWrite} id='write-tab-button' onClick={this.props.onWrite}>Write</button>
            </div>
        )
    }
}
export default CreateButtons;