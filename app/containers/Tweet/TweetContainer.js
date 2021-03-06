import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tweet } from 'components'
import * as usersLikesActions from 'redux/modules/usersLikes'

const { func, object, bool, number } = PropTypes

const TweetContainer = React.createClass({
  propTypes: {
    numberOfLikes: number,
    isLiked: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
    hideLikeCount: bool.isRequired,
    tweet: object.isRequired,
    hideReplyBtn: bool.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getDefaultProps: function () {
    return {
      hideLikeCount: false,
      hideReplyBtn: false
    }
  },
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push('/' + this.props.tweet.get('uid'))
  },
  handleClick (e) {
    e.stopPropagation()
    this.context.router.push('/tweetDetail/' + this.props.tweet.get('tweetId'))
  },
  render () {
    return (
      <Tweet
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        tweet={this.props.tweet}
        {...this.props} />
    )
  }
})

function mapStateToProps ({tweets, likeCount, usersLikes}, props) {
  return {
    tweet: tweets.get(props.tweetId),
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.tweetId] === true,
    numberOfLikes: likeCount[props.tweetId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetContainer)
