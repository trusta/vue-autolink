import autoLink from 'autolink.js'

function defaultFalse (val) {
  if (typeof val === 'undefined') {
    return false
  }
  if (val === false || val == 'false') {
    return false
  }
  return true
}

function defaultTrue (val) {
  if (typeof val === 'undefined') {
    return true
  }
  if (val === false || val == 'false') {
    return false
  }
  return true
}

function parseEmbed (opts, embed) {
  if (typeof embed !== 'undefined') {
    if (embed === 'false') {
      opts.embed = false
    } else {
      if (embed.length === 0 || embed === 'true') {
        opts.embed = true
      } else {
        embed.split(',').forEach(e => {
          opts[e.trim()] = true
        })
      }
    }
  }
  return opts
}

export default {
  props: ['content', 'embed', 'image', 'link-attr', 'image-attr', 'safe'],
  template: '<div v-html="autoLinkContent"></div>',
  computed: {
    autoLinkContent: function () {
      let opts = {}
      opts.image = defaultTrue(this.image)
      opts = parseEmbed(opts, this.embed)
      opts.linkAttr = this.linkAttr
      opts.imageAttr = this.imageAttr
      opts.safe = defaultFalse(this.safe)
      return autoLink(this.content, opts)
    }
  }
}
