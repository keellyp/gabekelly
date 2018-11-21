class HandleScroll {
  constructor(timer, tolerance) {
    this.isScrolling = false
    this.scrollTimer = timer || 500
    this.scrollTolerance = tolerance || 150

    // Add scroll event
    this.setupEventListener()
  }

  setupEventListener() {
    document.body.addEventListener(
      'mousewheel',
      this.handleWheel.bind(this),
      false
    )
  }

  handleWheel(e) {
    if (
      this.isScrolling === false &&
      Math.abs(e.wheelDeltaY) >= this.scrollTolerance
    ) {
      if (e.deltaY > 0) {
        this.isScrolling = true
        this.update(1)
      } else {
        this.isScrolling = true
        this.update(-1)
      }
    }
  }

  update(value) {
    setTimeout(() => {
      this.isScrolling = false
    }, this.scrollTimer)
    console.log(value)
  }
}

export default HandleScroll
