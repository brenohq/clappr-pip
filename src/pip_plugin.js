import { Browser, CorePlugin, Events } from 'clappr'

import SafariPip from './safari_pip'
import W3CPip from './w3c_pip'

export default class PipPlugin extends CorePlugin {
  get name() { return 'pip' }

  get playback() { return this.core.getCurrentPlayback() }

  get videoElement() { return this.playback && this.playback.el }

  constructor(core) {
    super(core)
    this.playback && this._onContainerChanged()
  }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this._onContainerChanged)
  }

  getExternalInterface() {
    return {
      isPictureInPictureSupported: this.isPictureInPictureSupported,
      isPictureInPictureActive: this.isPictureInPictureActive,
      enterPictureInPicture: this.enterPictureInPicture,
      exitPictureInPicture: this.exitPictureInPicture,
      togglePictureInPicture: this.togglePictureInPicture,
    }
  }

  isPictureInPictureSupported() {
    return this._pip && this._pip.isSupported
  }

  isPictureInPictureActive() {
    return this._pip && this._pip.isActive
  }

  enterPictureInPicture() {
    return this._pip && this._pip.enterPictureInPicture()
  }

  exitPictureInPicture() {
    return this._pip && this._pip.exitPictureInPicture()
  }

  togglePictureInPicture() {
    return this._pip && this._pip.togglePictureInPicture()
  }

  _onContainerChanged() {
    this._pip = Browser.isSafari
        ? new SafariPip(this.videoElement)
        : new W3CPip(this.videoElement)
  }
}