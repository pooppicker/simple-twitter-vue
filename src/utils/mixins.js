import moment from 'moment'
moment.locale('zh-tw')

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}

export const descriptionLengthFilter = {
  filters: {
    descriptionLength(description) {
      if (description.length > 50) {
        return description.substr(0, 50) + '...'
      } else {
        return description
      }
    }
  }

}

export const nameLengthFilter = {
  filters: {
    nameLength(name) {
      if (name.length > 50) {
        return name.substr(0, 50) + '...'
      } else {
        return name
      }
    }
  }

}