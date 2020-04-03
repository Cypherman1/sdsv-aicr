import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { FlexBox, FlexItem } from '../flex';
import ImageMapList from './ImageMapList';
import { CommonButton } from '../common';
import Icon from '../icon/Icon';

class ImageMapHeaderToolbar extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
    }

    render() {
        const { canvasRef, selectedItem } = this.props;
        const isCropping = canvasRef ? canvasRef.handler.interactionMode === 'crop' : false;
        return (
            <FlexBox className="rde-editor-header-toolbar-container" flex="1">
                <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-group">
                    <CommonButton
                        className="rde-action-btn"
                        disabled={isCropping}
                        onClick={() => canvasRef.handler.toGroup()}
                        tooltipTitle={i18n.t('action.object-group')}
                    >
                        <Icon name="object-group" style={{ marginRight: 8 }} />
                        Group
                    </CommonButton>
                    <CommonButton
                        className="rde-action-btn"
                        disabled={isCropping}
                        onClick={() => canvasRef.handler.toActiveSelection()}
                        tooltipTitle={i18n.t('action.object-ungroup')}
                        >
                        <Icon name="object-ungroup" style={{ marginRight: 8 }} />
                        UnGroup
                    </CommonButton>
                </FlexItem>   
                <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-history rde-canvas-toolbar-list">
                    <CommonButton
                        className="rde-action-btn"
                        disabled={isCropping || (canvasRef && !canvasRef.handler.transactionHandler.undos.length)}
                        onClick={() => canvasRef.handler.transactionHandler.undo()}
                    >
                        <Icon name="undo-alt" style={{ marginRight: 8 }} />
                        Undo
                    </CommonButton>
                    <CommonButton
                        className="rde-action-btn"
                        disabled={isCropping || (canvasRef && !canvasRef.handler.transactionHandler.redos.length)}
                        onClick={() => canvasRef.handler.transactionHandler.redo()}
                    >
                        <Icon name="redo-alt" style={{ marginRight: 8 }} />
                        Redo
                    </CommonButton>
                    {/* <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        icon="layer-group"
                        tooltipTitle={i18n.t('action.canvas-list')}
                    />
                    <div className="rde-canvas-list">
                        <ImageMapList canvasRef={canvasRef} selectedItem={selectedItem} />
                    </div> */}
                </FlexItem>             
                {/* <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-operation">
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handler.saveImage()}
                        icon="image"
                        tooltipTitle={i18n.t('action.image-save')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handler.duplicate()}
                        icon="clone"
                        tooltipTitle={i18n.t('action.clone')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handler.remove()}
                        icon="trash"
                        tooltipTitle={i18n.t('action.delete')}
                    />
                </FlexItem>                 */}
            </FlexBox>
        );
    }
}

export default ImageMapHeaderToolbar;
